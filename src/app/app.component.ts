import { HttpClient } from '@angular/common/http';
import { PosicaoVeiculosService } from './services/posicao-veiculos/posicao-veiculos.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() { }

  title = 'mobi-veiculos';
}
