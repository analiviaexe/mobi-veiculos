import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RestService } from './rest.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.dev';

describe('RestService', () => {
  let service: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService, HttpClient, HttpHandler ]
    });

    service = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
