/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SessaoService } from './sessao.service';

describe('Service: Sessao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessaoService]
    });
  });

  it('should ...', inject([SessaoService], (service: SessaoService) => {
    expect(service).toBeTruthy();
  }));
});
