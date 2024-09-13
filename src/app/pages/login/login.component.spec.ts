/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SessaoService } from '../../services/sessao/sessao.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: any;
  let sessaoServiceMock: any;

  beforeEach((() => {
    routerMock = {
      navigate: jest.fn(),
    };

    sessaoServiceMock = {
      salvarSessao: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: SessaoService, useValue: sessaoServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar o username do formControl', () => {
    expect(component.username).toBe(component.formGroup.get('username'));
  });

  it('deve retornar o password do formControl', () => {
    expect(component.password).toBe(component.formGroup.get('password'));
  });

  it('deve marcar o form como invalido caso os campos estejam vazios', () => {
    component.formGroup.setValue({
      username: '',
      password: '',
    });
    expect(component.formGroup.invalid).toBeTruthy();
  });

  it('deve resetar o form e nao navegar para home', () => {
    component.formGroup.setValue({
      username: '',
      password: '',
    });
    component.redirecionaHome();
    expect(component.formGroup.valid).toBeFalsy();
    expect(component.formGroup.value).toEqual({ username: '', password: '' });
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('deve salvar a sessao do user e navegar para home quando o form esta valido', () => {
    const mockCredentials = { username: 'teste123', password: 'senha123' };

    component.formGroup.setValue(mockCredentials);
    component.redirecionaHome();

    expect(component.formGroup.valid).toBeTruthy();
    expect(sessaoServiceMock.salvarSessao).toHaveBeenCalledWith(mockCredentials);
    expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
  });

  it('nao deve navegar para home caso o formulario esteja invalido', () => {
    component.formGroup.setValue({
      username: '',
      password: '123senha',
    });
    component.redirecionaHome();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
