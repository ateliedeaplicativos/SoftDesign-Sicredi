import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { noop } from 'rxjs';
import { User } from 'src/app/auth/models/user';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Need to have correct values', () => {
    expect(service['TOKEN_USER']).toBe('user-token');
  });


  it('setUserLocalStorage - need to do correct call', () => {
    spyOn(localStorage, 'setItem').and.callFake(noop);

    let fakeUser = new User();
    fakeUser.userName = 'nameTest';
    fakeUser.password = 'passTest';

    service.setUserLocalStorage(fakeUser);

    expect(localStorage.setItem).toHaveBeenCalledWith('user-token', JSON.stringify(fakeUser));
  });

  it('logout - need to do correct call', () => {
    spyOn(localStorage, 'removeItem').and.callFake(noop);

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('user-token');
  });


  it('login - with correct mocked credentials - need to get correct values', fakeAsync(() => {
    spyOn(service, 'setUserLocalStorage').and.callFake(noop);
    let mockedUser = new User();
    mockedUser.userName = 'admin';
    mockedUser.password = '123456';

    service.login(mockedUser)
      .subscribe({
        next: event => {
          expect(event.message).toBe('Logado com sucesso');
          expect(service.setUserLocalStorage).toHaveBeenCalledWith(mockedUser);
        },
        error: error => {
          expect(true).toBeFalse(); // dont need to enter here!
        },
      });

      tick(1001);
  }))

  it('login - with correct userName but incorrect password - need to get correct values', fakeAsync(() => {
    let mockedUser = new User();
    mockedUser.userName = 'admin';
    mockedUser.password = 'incorrect';

    service.login(mockedUser)
      .subscribe({
        next: event => {
          expect(true).toBeFalse(); // dont need to enter here!
        },
        error: error => {
          expect(error.message).toBe('Nome de usuário e/ou senha inválidos');
        },
      });
      tick(1000);
  }))

  it('login - with correct password but incorrect userName - need to get correct values', fakeAsync(() => {
    let mockedUser = new User();
    mockedUser.userName = 'incorrect';
    mockedUser.password = '123456';

    service.login(mockedUser)
      .subscribe({
        next: event => {
          expect(true).toBeFalse(); // dont need to enter here!
        },
        error: error => {
          expect(error.message).toBe('Nome de usuário e/ou senha inválidos');
        },
      });
      tick(1000);
  }))

  it('isLoged - without user in storage - need to return false', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return null;
    });

    let returnedValue = service.isLogged();

    expect(returnedValue).toBeFalse();
    expect(localStorage.getItem).toHaveBeenCalledWith('user-token');
  });

  it('isLoged - with user in storage - need to return true', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return 'with-user';
    });

    let returnedValue = service.isLogged();

    expect(returnedValue).toBeTrue();
    expect(localStorage.getItem).toHaveBeenCalledWith('user-token');
  });

});
function finalize(arg0: () => void): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

