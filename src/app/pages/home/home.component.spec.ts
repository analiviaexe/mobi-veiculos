import { PosicaoVeiculosService } from '../../../app/services/posicao-veiculos/posicao-veiculos.service';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { CalculoPontosService } from '../../services/calculo-pontos/calculo-pontos.service';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let posicaoVeiculosServiceMock: any;
  let calculoPontosServiceMock: any;

  beforeEach(() => {
    posicaoVeiculosServiceMock = {
      getPlacas: jest.fn().mockReturnValue(of([])),
      getPOIS: jest.fn().mockReturnValue(of([])),
      getPosicaoEspecifica: jest.fn().mockReturnValue(of([])),
      filtroData: { next: jest.fn(), value: '' },
      filtroPlaca: { next: jest.fn(), value: '' },
      currentFilterPlaca: of([]),
      currentFilterData: of(''),
    };

    calculoPontosServiceMock = {
      retornaVeiculosEmPOIs: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ HomeComponent ],
      providers: [
        provideHttpClient(),
        { provide: PosicaoVeiculosService, useValue: posicaoVeiculosServiceMock },
        { provide: CalculoPontosService, useValue: calculoPontosServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com data formatada e chamar metodos getPOIS e getPlacas', () => {
    const getPOISSpy = jest.spyOn(component, 'getPOIS').mockReturnValue();
    const getPlacasSpy = jest.spyOn(component, 'getPlacas');

    component.ngOnInit();

    const dataFormatada = new Date().toISOString().split('T')[0];
    expect(component.filterData).toEqual(dataFormatada);
    expect(getPOISSpy).toHaveBeenCalled();
    expect(getPlacasSpy).toHaveBeenCalled();
    expect(posicaoVeiculosServiceMock.filtroData.next).toHaveBeenCalledWith(dataFormatada);
  });

  it('deve atualizar pois ao chamar getPOIS', () => {
    const mockPOIs = [{ nome: 'poi a' }, { nome: 'poi b' }];
    posicaoVeiculosServiceMock.getPOIS.mockReturnValue(of(mockPOIs));

    component.getPOIS();
    expect(component.pois).toEqual(mockPOIs);
  });

  it('deve definir placas corretamente ao chamar getPlacas', () => {
    const mockPlacas = ['abc123', 'fff456'];
    posicaoVeiculosServiceMock.getPlacas.mockReturnValue(of(mockPlacas));

    component.getPlacas();
    expect(component.placas).toEqual(mockPlacas);
    expect(component.carregaTabela).toBeTruthy();
  });

  it('deve exibir erro ao falhar ao carregar placas', () => {
    const mockError = { status: '404' };
    posicaoVeiculosServiceMock.getPlacas.mockReturnValue(throwError(mockError));

    component.getPlacas();
    expect(component.hasError).toBeTruthy();
    expect(component.codErro).toEqual('404');
    expect(component.carregaTabela).toBeTruthy();
  });

  it('deve obter posicoes e popular dadosTabela corretamente', () => {
    const mockPosicoes = [{ posicao: '1' }, { posicao: '2' }];
    const mockPOIs = [{ id:1,  nome: 'poi a', raio: 1, latitude: 12, longitude: 10 }];
    posicaoVeiculosServiceMock.getPosicaoEspecifica.mockReturnValue(of(mockPosicoes));
    calculoPontosServiceMock.retornaVeiculosEmPOIs.mockReturnValue(mockPosicoes);

    component.pois = mockPOIs;
    component.getPosicoes(['abc123'], '2023-09-01');

    expect(component.posicoes).toEqual(mockPosicoes);
    expect(component.dadosTabela).toEqual(mockPosicoes);
  });

  it('deve exibir erro ao falhar ao carregar posicoes', () => {
    const mockError = { status: '500' };
    posicaoVeiculosServiceMock.getPosicaoEspecifica.mockReturnValue(throwError(mockError));

    component.getPosicoes(['abc123'], '2024-09-01');

    expect(component.hasError).toBeTruthy();
    expect(component.codErro).toEqual('500');
  });

  it('deve filtrar dados com base na posicao', () => {
    component.dadosTabela = [
      { posicao: 'ponto 1' },
      { posicao: 'ponto a' },
      { posicao: 'ponto x' }
    ];
    component.filterPosicao = 'ponto a';

    const filteredData = component.filteredData();
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].posicao).toEqual(component.filterPosicao);
  });
});
