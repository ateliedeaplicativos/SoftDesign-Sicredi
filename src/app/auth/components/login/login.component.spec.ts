import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { noop, of, throwError } from 'rxjs';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('need to have correct variable values', () => {
    // privates
    expect(component['formBuilder'] instanceof FormBuilder).toBeTruthy();
    expect(component['spinnerService'] instanceof SpinnerService).toBeTruthy();
    expect(component['loginService'] instanceof LoginService).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();

    expect(component.formLogin instanceof FormGroup).toBeTruthy();
    expect(component.isSubmitted).toBeFalse();
    expect(component.loginErrorMessage).toBe('');

    expect
  });

  it('onInit - need to have corret calls', () => {
    spyOn(component, 'createFormLogin').and.callThrough();
    expect(component).toBeTruthy();

    component.ngOnInit();

    expect(component.createFormLogin).toHaveBeenCalledWith(new User());
  });

  it('createFormLogin - need to create correctly', () => {
    expect(component).toBeTruthy();

    let mockUser = new User();

    component.createFormLogin(mockUser);

    expect(Object.keys(component.formLogin.value).length).toBe(2);
    expect(component.formLogin.value.userName).toBe('');
    expect(component.formLogin.value.password).toBe('');
  });

  it('login - form invalid', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['loginService'], 'login').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // form invalid
    component.formLogin = component['formBuilder'].group({
      userName: ['', Validators.required],
    });

    component.login();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).not.toHaveBeenCalled();
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.loginErrorMessage).toBe('');
  });

  it('login - form valid - with success', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['loginService'], 'login').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.formLogin = component['formBuilder'].group({
      userName: ['user']
    });

    component.login();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/dragons');
    expect(component.loginErrorMessage).toBe('');
  });

  it('login with error - with message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['loginService'], 'login').and.callFake(() => {
      return throwError({message: 'Error'});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.formLogin = component['formBuilder'].group({
      userName: ['user']
    });

    component.login();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.loginErrorMessage).toBe('Error');
  });

  it('login with error - without message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['loginService'], 'login').and.callFake(() => {
      return throwError({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.formLogin = component['formBuilder'].group({
      userName: ['user']
    });

    component.login();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.loginErrorMessage).toBe('Houve um erro ao tentar se logar');
  });


});
