import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { LoginService } from '../services/login.service';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [],
      providers: []
    })
    .compileComponents();
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor - need to have correct variables', () => {
    expect(service['router'] instanceof Router).toBeTruthy();
    expect(service['loginService'] instanceof LoginService).toBeTruthy();
  });

  it('User is not logged - need return false and redirect to login', () => {

    spyOn(service['loginService'], 'isLogged').and.callFake(() => {
      return false;
    })

    spyOn(service['router'], 'navigate');

    let returnOf = service.canActivate();
    expect(returnOf).toBeFalse();
    expect(service['router'].navigate).toHaveBeenCalledWith(["login"]);
  });

  it('User is logged - need return true and not call router to login', () => {

    spyOn(service['loginService'], 'isLogged').and.callFake(() => {
      return true;
    })

    spyOn(service['router'], 'navigate');

    let returnOf = service.canActivate();
    expect(returnOf).toBeTrue();
    expect(service['router'].navigate).not.toHaveBeenCalled();
  });
});
