import { HttpClient, HttpHandler } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { RestService } from '../rest/rest.service';
import { PosicaoVeiculosService } from './posicao-veiculos.service';

const mockRestService = {
  get: jest.fn()
};

let posicaoMock = [{
  "id": 1,
  "placa": "abc676",
  "data": "2012-12-12T02:04:03.000+00:00",
  "velocidade": 0,
  "latitude": 24,
  "longitude": 25,
  "ignicao": false
}];

let POIMock = [{
  "id": 1,
  "nome": "ponto a",
  "raio": 100,
  "latitude": 30,
  "longitude": 35
}];

describe('PosicaoVeiculos', () => {
  let service: PosicaoVeiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosicaoVeiculosService, HttpClient, HttpHandler,  { provide: RestService, useValue: mockRestService }]
    });

    service = TestBed.inject(PosicaoVeiculosService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar placas', () => {
    const placas = ['abc123', 'iii989'];
    mockRestService.get.mockReturnValue(of(placas));

    service.getPlacas().subscribe(result => {
      expect(result).toEqual(placas);
    });

    expect(mockRestService.get).toHaveBeenCalledWith(environment.api.endpoints.placas);
  });

  it('deve retornar posicoes', () => {
    const posicoes = posicaoMock;
    mockRestService.get.mockReturnValue(of(posicoes));

    service.getPosicoes().subscribe(result => {
      expect(result).toEqual(posicoes);
    });

    expect(mockRestService.get).toHaveBeenCalledWith(environment.api.endpoints.posicao);
  });

  it('deve retornar posicao especifica e armazenar no cache', () => {
    const placa = 'abc123';
    const data = '2012-01-01';
    const posicoes = posicaoMock;
    const cacheKey = `${placa}_${data}`;

    mockRestService.get.mockReturnValue(of(posicoes));

    service.getPosicaoEspecifica(placa, data).subscribe(result => {
      expect(result).toEqual(posicoes);
      expect(service['cachePosicoes'].has(cacheKey)).toBeFalsy();
      expect(result).toEqual(posicoes);
    });

    const searchParams = new URLSearchParams();
    searchParams.set('placa', placa);
    searchParams.set('data', data);
    const url = `${environment.api.endpoints.posicao}?${searchParams.toString()}`;
    expect(mockRestService.get).toHaveBeenCalledWith(url);
  });

  it('deve retornar posicao especifica ja armazenada no cache', () => {
    const placa = 'abc123';
    const data = '2012-01-10';
    const posicoes = posicaoMock;
    const cacheKey = `${placa}_${data}`;

    mockRestService.get.mockReturnValue(of(posicoes));

    service.getPosicaoEspecifica(placa, data).subscribe(result => {
      expect(result).toEqual(posicoes);
      expect(service['cachePosicoes'].has(cacheKey)).toBeTruthy();
      expect(service['cachePosicoes'].get(cacheKey)).toEqual(posicoes);
      expect(result).toEqual(posicoes);
    });

    const searchParams = new URLSearchParams();
    searchParams.set('placa', placa);
    searchParams.set('data', data);
    const url = `${environment.api.endpoints.posicao}?${searchParams.toString()}`;
    expect(mockRestService.get).toHaveBeenCalledWith(url);
  });

  it('deve retornar POIs', () => {
    const pois = POIMock;
    mockRestService.get.mockReturnValue(of(pois));

    service.getPOIS().subscribe(result => {
      expect(result).toEqual(pois);
    });

    expect(mockRestService.get).toHaveBeenCalledWith(environment.api.endpoints.pois);
  });

  it('deve retornar um POI especifico', () => {
    const poiName = 'poi1';
    const poi = POIMock;
    mockRestService.get.mockReturnValue(of(poi));

    service.getPOIEspecifico(poiName).subscribe(result => {
      expect(result).toEqual(poi);
    });

    expect(mockRestService.get).toHaveBeenCalledWith(`${environment.api.endpoints.pois}/${poiName}`);
  });
});
