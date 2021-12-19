import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { DragonDetailsResolver } from './dragon-details.resolver';
import { DragonService } from '../services/dragon.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { noop, of, throwError } from 'rxjs';

describe('DragonDetailsResolver', () => {
  let resolver: DragonDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    resolver = TestBed.inject(DragonDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });


  it('constructor - need to have correct values', () => {
    expect(resolver['dragonService'] instanceof DragonService).toBeTruthy();
    expect(resolver['router'] instanceof Router).toBeTruthy();
  });

});
