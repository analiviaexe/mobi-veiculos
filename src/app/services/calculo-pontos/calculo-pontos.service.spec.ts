/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CalculoPontosService } from './calculo-pontos.service';

describe('CalculoPontosService', () => {
  let service: CalculoPontosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculoPontosService]
    });

    service = TestBed.inject(CalculoPontosService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('deve calcular a distancia entre o veiculo e o POI', () => {
    const latidudePosicao = -23.550520;
    const longitudePosicao = -46.633308;
    const latitudePOI = -23.551520;
    const longitudePOI = -46.634308;

    const distancia = service.getDistanciaVeiculoPOI(
      latidudePosicao,
      longitudePosicao,
      latitudePOI,
      longitudePOI
    );

    expect(distancia).toBeCloseTo(150.84, 1)
  });

  it('deve retornar veiculos que passaram pelos POIs', () => {
    const posicoes = [
      { id: 1, placa: 'ABC123', latitude: -23.551520, longitude: -46.634308, ignicao: false, velocidade: 0, data: '2024-09-13T10:00:00Z' },
      { id: 2, placa: 'ABC123', latitude: -23.551520, longitude: -46.634308, ignicao: true, velocidade: 20, data: '2024-09-13T10:05:00Z' }
    ];

    const POIs = [
      { id: 10, nome: 'POI 1', latitude: -23.551520, longitude: -46.634308, raio: 100 }
    ];

    const resultado = service.retornaVeiculosEmPOIs(posicoes, POIs);

    expect(resultado).toEqual([
      {
        placa: 'ABC123',
        posicao: 'POI 1',
        data: '2024-09-13',
        tempo: '5 minutos'
      }
    ]);
  });

  it('deve converter minutos em formato legível', () => {
    const minutos = 125;
    const resultado = service.converteMinutosLegivel(minutos);

    expect(resultado).toBe('2 horas e 5 minutos');
  });

  it('deve converter minutos em formato legível sem horas', () => {
    const minutos = 45;
    const resultado = service.converteMinutosLegivel(minutos);

    expect(resultado).toBe('45 minutos');
  });
});
