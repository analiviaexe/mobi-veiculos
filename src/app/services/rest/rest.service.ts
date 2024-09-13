import { environment } from './../../../environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

constructor(
  private http: HttpClient
) { }

  public get(path: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(
      `${environment.contexto}${path}`,
      { headers: this.concatWithDefaultHeaders(headers) }
    );
  }

  public post(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(
      `${environment.contexto}${path}`,
      body,
      { headers: this.concatWithDefaultHeaders(headers) }
    );
  }

  private concatWithDefaultHeaders(headers?: HttpHeaders): HttpHeaders {
    return (headers || new HttpHeaders()).set('Content-Type', 'application/json');
  }
}
