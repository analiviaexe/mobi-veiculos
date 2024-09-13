/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve calcular o numero total de paginas', () => {
    component.data = Array(12).fill({});
    component.pageSize = 5;
    expect(component.totalPages).toBe(3);
  });

  it('deve retornar dados paginados', () => {
    component.data = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    component.pageSize = 5;
    component.currentPage = 2;

    const paginatedData = component.paginatedData();

    expect(paginatedData.length).toBe(5);
    expect(paginatedData[0].id).toBe(6);
  });

  it('deve ordenar dados por coluna "placa" em ordem ascendente e descendente', () => {
    component.data = [
      { placa: 'ABC123' },
      { placa: 'XYZ789' },
      { placa: 'DEF456' },
    ];

    component.sortData('placa');
    expect(component.filteredData()[0].placa).toBe('ABC123');

    component.sortData('placa');
    expect(component.filteredData()[0].placa).toBe('XYZ789');
  });

  it('deve alternar entre ordem crescente e decrescente ao classificar por coluna', () => {
    component.data = [
      { posicao: '1' },
      { posicao: '3' },
      { posicao: '2' },
    ];

    component.sortData('posicao');
    expect(component.isAscending).toBe(true);

    component.sortData('posicao');
    expect(component.isAscending).toBe(false);
  });

  it('deve ir para a pagina anterior quando currentPage for maior que 1', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('nao deve ir para a pagina anterior quando currentPage for 1', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('deve ir para a proxima pagina quando currentPage for menor que totalPages', () => {
    component.data = Array(10).fill({});
    component.pageSize = 5;
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('nao deve ir para a proxima pagina quando currentPage for igual a totalPages', () => {
    component.data = Array(10).fill({});
    component.pageSize = 5;
    component.currentPage = 2;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('deve atualizar o tamanho da pagina e resetar para a primeira pagina ao alterar o tamanho da pagina', () => {
    component.data = Array(20).fill({});
    const event = { target: { value: 10 } };

    component.updatePageSize(event);

    expect(component.pageSize).toBe(10);
    expect(component.currentPage).toBe(1);
  });
});
