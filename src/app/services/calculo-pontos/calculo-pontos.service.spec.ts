/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CalculoPontosService } from './calculo-pontos.service';

describe('Service: CalculoPontos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculoPontosService]
    });
  });

  it('should ...', inject([CalculoPontosService], (service: CalculoPontosService) => {
    expect(service).toBeTruthy();
  }));
});
