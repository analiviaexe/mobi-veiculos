import { HttpClient, HttpHandler } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RestService } from './rest.service';

describe('Service: Rest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestService, HttpClient, HttpHandler]
    });
  });

  it('should ...', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
