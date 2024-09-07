import { POI } from './../../models/poi.model';
import { Posicao } from './../../models/posicao.model';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosicaoVeiculosService {

constructor(
  private restService: RestService
) { }

  getPlacas(): Observable<any> {
    return this.restService.get(environment.api.endpoints.placas);
  }

  getPosicao(placa: string, data: string): Observable<Posicao[]> {
    const url = `${environment.api.endpoints.posicao}?placa=${placa}&data=${data}`;
    return this.restService.get(url);
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
