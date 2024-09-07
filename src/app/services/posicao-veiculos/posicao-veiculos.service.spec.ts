import { HttpClient, HttpHandler } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PosicaoVeiculosService } from './posicao-veiculos.service';

describe('Service: PosicaoVeiculos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosicaoVeiculosService, HttpClient, HttpHandler]
    });
  });

  it('should ...', inject([PosicaoVeiculosService], (service: PosicaoVeiculosService) => {
    expect(service).toBeTruthy();
  }));
});
