import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { noop, Observable } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [ ],
      providers: []
    })
    .compileComponents();
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
