import { POI } from './../../models/poi.model';
import { Posicao } from './../../models/posicao.model';
import { Injectable } from '@angular/core';
import { groupBy } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CalculoPontosService {

  private readonly RAIO_TERRA = 6371000;
  private readonly V_MAXIMA = 30 / 3.6; // Velocidade máxima 30km/h

  constructor() { }

  //usa a formula de haversine para calcular a distancia do veiculo do POI
  getDistanciaVeiculoPOI(latidudePosicao: number, longitudePosicao: number, latitudePOI: number, longitudePOI: number): number {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    const deltaLat = toRadians(latitudePOI - latidudePosicao);
    const deltaLon = toRadians(longitudePOI - longitudePosicao);

    const a = Math.sin(deltaLat / 2) ** 2 +
      Math.cos(toRadians(latidudePosicao)) *
      Math.cos(toRadians(latitudePOI)) *
      Math.sin(deltaLon / 2) ** 2;
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.RAIO_TERRA * d;
  }


  retornaVeiculosEmPOIs(posicoes: Posicao[], POIs: POI[]): any[] {
    const result: any[] = [];

    POIs.forEach((ponto: POI) => {
      const poiName = ponto.nome;
      const posicaoPorPlaca = groupBy(posicoes, 'placa');

      Object.entries(posicaoPorPlaca).forEach(([placa, posicoes]) => {
        let tempoTotal = 0;

        const posicoesAgrupadas = posicoes as Posicao[];
        posicoesAgrupadas.forEach((posicao: Posicao, i: number) => {
          const carLat = posicao.latitude;
          const carLon = posicao.longitude;
          const ligado = posicao.ignicao;
          const velocidade = posicao.velocidade;
          const tempoCorridoAtual = new Date(posicao.data);

          if (i < posicoesAgrupadas.length - 1) {
            const tempoCorridoProximo = new Date(posicoesAgrupadas[i + 1].data);
            const intervalo = (tempoCorridoProximo.getTime() - tempoCorridoAtual.getTime()) / 1000; // Tempo em segundos

            const distanceToPoint = this.getDistanciaVeiculoPOI(carLat, carLon, ponto.latitude, ponto.longitude);

            if (distanceToPoint <= ponto.raio && (!ligado || velocidade <= this.V_MAXIMA)) {
              tempoTotal += intervalo;
            }
          }
        });

        if (tempoTotal > 0) {
          const totalTimeInHours = tempoTotal / 60;

          result.push({
            placa: placa,
            posicao: poiName,
            data: (posicoes as Posicao[])[0].data.split('T')[0],
            tempo: this.converteMinutosLegivel(totalTimeInHours)
          });
        }
      });
    });

    return result;
  }

  converteMinutosLegivel(totalMinutes: number): string {
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.floor(totalMinutes % 60);

    let result = '';

    if (hours > 0) {
      result += `${hours} hora${hours > 1 ? 's' : ''} e `;
    }
    result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;

    return result;
  }
}
