import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoPontosService {

  private readonly EARTH_RADIUS = 6371000; // Raio da Terra em metros

constructor() { }

  //usa a formula de haversine para calcular a distancia do veiculo do POI
  getDistanciaVeiculoPOI(latidudeCar: number, longitudeCar: number, latitudePOI: number, longitudePOI: number, raioPOI: number): number {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    const deltaLat = toRadians(latitudePOI - latidudeCar);
    const deltaLon = toRadians(longitudePOI - longitudeCar);

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(toRadians(latidudeCar)) *
        Math.cos(toRadians(latitudePOI)) *
        Math.sin(deltaLon / 2) ** 2;
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.EARTH_RADIUS * d;
  }

  //só mantem se ficou
  calculaTempoPermanencia() {

  }

  retornaVeiculosEmPOIs(posicoes: any[], POIs: any[]): any {
    const tempo: any = {};

    posicoes.forEach((posicao) => {
      const placa = posicao.veiculo;
      tempo[placa] = {};

      POIs.forEach((poi) => {
        const nomePOI = poi.nome;
        tempo[placa][nomePOI] = 0;

        let inPointStart: Date | null = null;

        posicao.positions.forEach((record: any) => {
          const carLat = record.latitude;
          const carLon = record.longitude;
          const ignition = record.ignicao;
          const timestamp = new Date(record.data);

          // Calcula a distância entre o carro e o ponto
          // const distance = this.carroDentroPOI(
          //   carLat,
          //   carLon,
          //   point.latitude,
          //   point.longitude,
          //   point.raio
          // );

          // if (this.carroDentroPOI(carLat, carLon, point.latitude, point.longitude, point.raio) && !ignition) {
          //   if (!inPointStart) {
          //     inPointStart = timestamp;
          //   }
          // } else {
          //   if (inPointStart) {
          //     const timeSpent =
          //       (timestamp.getTime() - inPointStart.getTime()) / 1000; // Em segundos
          //     timeInPoints[plate][pointName] += timeSpent;
          //     inPointStart = null;
          //   }
          // }
        });
      });
    });

    return tempo;
  }

}
