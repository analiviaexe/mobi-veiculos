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
  imports: [ CommonModule, TableComponent ],
})
export class HomeComponent implements OnInit {

  placas: string[] = [];
  posicoes: Posicao[] = [];
  pois: POI[] = [];

  constructor(
    private posicaoVeiculosService: PosicaoVeiculosService,
  ) { }

  ngOnInit(): void {
    this.getPlacas();
    this.getPosicoes();
    this.getPontos();
  }

  getPlacas(){
    this.posicaoVeiculosService.getPlacas().subscribe(res => {
      this.placas = res;
    });
  }

  getPosicoes() {
    this.posicaoVeiculosService.getPosicao('TESTE001', '12/16/2018').subscribe(res => {
      this.posicoes = res;
    });
  }

  getPontos(){
    this.posicaoVeiculosService.getPOIS().subscribe(res => {
      this.pois = res;
    });
  }
}
