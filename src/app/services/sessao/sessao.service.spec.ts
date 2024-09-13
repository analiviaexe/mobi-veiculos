import { TestBed, inject } from '@angular/core/testing';
import { Sessao } from 'src/app/models/sessao.model';
import { SessaoService } from './sessao.service';

const ACCESS_TOKEN = "auth_token";
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

describe('SessaoService', () => {
  let service: SessaoService;

  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
    writable: true
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessaoService]
    });

    service = TestBed.inject(SessaoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('deve restaurar sessao se dados estiverem no sessionStorage', () => {
    const dadosSessao: Sessao = { username: 'teste', password: 'senha123'};
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(dadosSessao));

    service.restaurarSessao();

    service.getSessao().subscribe(sessao => {
      expect(sessao).toEqual(dadosSessao);
    });

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith(ACCESS_TOKEN);
  });

  it('deve salvar sessao no sessionStorage', () => {
    const dadosSessao: Sessao = { username: 'teste', password: 'senha123'};

    service.salvarSessao(dadosSessao);

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      JSON.stringify(dadosSessao)
    );

    service.getSessao().subscribe(sessao => {
      expect(sessao).toEqual(dadosSessao);
    });
  });

  it('deve limpar sessao e sessionStorage', () => {
    service.limparSessao();

    expect(mockSessionStorage.clear).toHaveBeenCalled();
    service.getSessao().subscribe(sessao => {
      expect(sessao).toBeNull();
    });
  });

  it('deve retornar se esta logado', () => {
    const dadosSessao: Sessao = { username: 'teste', password: 'senha123'};

    service.salvarSessao(dadosSessao);
    expect(service.estaLogado()).toBe(true);

    service.limparSessao();
    expect(service.estaLogado()).toBe(false);
  });
});
