import { POI } from './../../models/poi.model';
import { Posicao } from './../../models/posicao.model';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosicaoVeiculosService {

constructor(
  private restService: RestService
) { }

  filtroPlaca = new BehaviorSubject<string[]>([]);
  currentFilterPlaca= this.filtroPlaca.asObservable();

  filtroData = new BehaviorSubject<string>('');
  currentFilterData= this.filtroData.asObservable();

  private cachePosicoes = new Map<string, any>();

  getPlacas(): Observable<any> {
    return this.restService.get(environment.api.endpoints.placas);
  }

  getPosicoes(): Observable<Posicao[]> {
    const url = `${environment.api.endpoints.posicao}`;
    return this.restService.get(url);
  }

  getPosicaoEspecifica(placa: string, data: string): Observable<Posicao[]> {
    const cacheKey = `${placa}_${data}`;

    if (this.cachePosicoes.has(cacheKey)) {
      return of(this.cachePosicoes.get(cacheKey));
    }

    var searchParams = new URLSearchParams();
    searchParams.set("placa", placa);
    searchParams.set("data",data);
    const url = `${environment.api.endpoints.posicao}?${searchParams}`;

    return this.restService.get(url).pipe(
      tap(posicoes => {
        this.cachePosicoes.set(cacheKey, posicoes);
      })
    );
  }

  getPOIS(): Observable<POI[]> {
    const url = `${environment.api.endpoints.pois}`;
    return this.restService.get(url);
  }

  getPOIEspecifico(poiName: string,): Observable<POI> {
    const url = `${environment.api.endpoints.pois}/${poiName}`;
    return this.restService.get(url);
  }
}
