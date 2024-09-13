/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [ DropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir os itens selecionados quando "selecionadosDefault" for true no modo multiselect', () => {
    component.lista = ['item 1', 'item 2'];
    component.selecionadosDefault = true;
    component.multiselect = true;

    const selecionouSpy = jest.spyOn(component.selecionou, 'emit');

    component.ngAfterViewInit();
    expect(component.selecionados).toEqual(component.lista);
    expect(selecionouSpy).toHaveBeenCalledWith(component.lista);
  });

  it('deve emitir apenas o primeiro item quando "selecionadosDefault" for true e multiselect for false', () => {
    component.lista = ['item 1', 'item 2'];
    component.selecionadosDefault = true;
    component.multiselect = false;

    const selecionouSpy = jest.spyOn(component.selecionou, 'emit');

    component.ngAfterViewInit();
    expect(component.selecionados).toEqual([component.lista[0]]);
    expect(selecionouSpy).toHaveBeenCalledWith([component.lista[0]]);
  });

  it('deve adicionar o item aos selecionados quando nao estiver selecionado', () => {
    const item = 'item 1';
    component.selecionaItem(item);
    expect(component.selecionados).toContain(item);
  });

  it('deve remover o item dos selecionados quando ja estiver selecionado', () => {
    const item = 'item 1';
    component.selecionados = [item];
    component.selecionaItem(item);
    expect(component.selecionados).not.toContain(item);
  });

  it('deve emitir os itens selecionados apos selecionar um item', () => {
    const item = 'item 1';
    const selecionouSpy = jest.spyOn(component.selecionou, 'emit');

    component.selecionaItem(item);
    expect(selecionouSpy).toHaveBeenCalledWith([item]);
  });

  it('deve substituir o item selecionado quando multiselect for false', () => {
    component.multiselect = false;
    const item1 = 'item 1';
    const item2 = 'item 2';
    component.selecionados = [item1];
    component.selecionaItem(item2);
    expect(component.selecionados).not.toContain(item1);
    expect(component.selecionados).toContain(item2);
  });
});
