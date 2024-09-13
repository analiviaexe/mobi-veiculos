import { CalculoPontosService } from './../../services/calculo-pontos/calculo-pontos.service';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './../../components/dropdown/dropdown.component';
import { TableComponent } from './../../components/table/table.component';
import { POI } from './../../models/poi.model';
import { Component, OnInit } from '@angular/core';
import { Posicao } from '../../../app/models/posicao.model';
import { PosicaoVeiculosService } from '../../../app/services/posicao-veiculos/posicao-veiculos.service';
import { CommonModule } from '@angular/common';
import { formataDataISO } from '../../utils/utils';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ CommonModule, TableComponent, DropdownComponent, FormsModule ],
})
export class HomeComponent implements OnInit {

  dadosTabela: any[] = [];

  placas: string[] = [];
  posicoes: Posicao[] = [];
  pois: POI[] = [];
  hasError: boolean = false;
  codErro: string = '';
  carregaTabela = false;

  filterPosicao = '';
  filterData = '';

  constructor(
    protected posicaoVeiculosService: PosicaoVeiculosService,
    private calculoPontosService: CalculoPontosService,
  ) { }

  ngOnInit(): void {
    this.filterData = new Date().toISOString().split('T')[0];
    this.getPOIS()
    this.getPlacas();
    this.posicaoVeiculosService.filtroData.next(this.filterData)

    this.posicaoVeiculosService.currentFilterPlaca.subscribe(placas => {
      this.getPosicoes(placas, this.posicaoVeiculosService.filtroData.value);
    })
    this.posicaoVeiculosService.currentFilterData.subscribe(data => {
      this.getPosicoes(this.posicaoVeiculosService.filtroPlaca.value, data);
    });
  }

  getPOIS() {
    this.posicaoVeiculosService.getPOIS().subscribe(pontos => {
      this.pois = pontos;
    })
  }

  getPlacas(){
    this.posicaoVeiculosService.getPlacas().subscribe({
      next: res => {
        this.placas = res;
      },
      error: err => {
        this.hasError = true;
        this.codErro = err.status;
      },
      complete: () => {
        this.carregaTabela = true;
      },
    });
  }

  getPosicoes(placas: string[], data: string){
    this.posicoes = [];
    this.dadosTabela = [];
    placas.forEach(placa => {
      this.posicaoVeiculosService.getPosicaoEspecifica(placa, formataDataISO(data)).subscribe({
        next: posicoes => {
          if(posicoes.length === 0) {
            this.posicoes = [];
            this.dadosTabela = [];
          } else {
            posicoes.map(posicao => this.posicoes.push(posicao));
            this.calculoPontosService.retornaVeiculosEmPOIs(posicoes, this.pois).forEach(item => this.dadosTabela.push(item))
          }
        },
        error: err => {
          this.hasError = true;
          this.codErro = err.status;
        },
        complete: () => {
          this.hasError = false;
          this.carregaTabela = true;
        },
      });
    });
  }

  filteredData(): any[] {
    return this.dadosTabela
      .filter((item) => {
        return (
          (!this.filterPosicao || item.posicao.toLowerCase().includes(this.filterPosicao.toLowerCase()))
        )
      });
  }
}
