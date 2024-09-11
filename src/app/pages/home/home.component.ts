import { CardErroComponent } from './../../components/card-erro/card-erro.component';
import { TableComponent } from './../../components/table/table.component';
import { POI } from './../../models/poi.model';
import { Component, OnInit } from '@angular/core';
import { Posicao } from '../../../app/models/posicao.model';
import { PosicaoVeiculosService } from '../../../app/services/posicao-veiculos/posicao-veiculos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ CommonModule, TableComponent, CardErroComponent ],
})
export class HomeComponent implements OnInit {

  placas: string[] = [];
  posicoes: Posicao[] = [];
  pois: POI[] = [];
  hasError: boolean = false;
  codErro: string = '';
  dadosTabela = [];

  constructor(
    private posicaoVeiculosService: PosicaoVeiculosService,
  ) { }

  ngOnInit(): void {
    this.getPlacas();
    // this.getPosicoes();
    this.getPontos();
  }

  getPlacas(){
    this.posicaoVeiculosService.getPlacas().subscribe({
      next: res => {
        this.placas = res;
        console.log(this.placas)
      },
      error: err => {
        this.hasError = true;
        this.codErro = err.status;
      }
    });
  }

  // getPosicoes() {
  //   this.posicaoVeiculosService.getPosicoes().subscribe({
  //     next: res => {
  //       this.posicoes = res;
  //     },
  //     error: err => {
  //       this.hasError = true;
  //       this.codErro = err.status;
  //     }
  //   });
  // }

  getPontos(){
    this.posicaoVeiculosService.getPOIS().subscribe({
      next: res => {
        this.pois = res;
      },
      error: err => {
        this.hasError = true;
        this.codErro = err.status;
      }
    });
  }

  montaDadosTabela() {
  }
}
