import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateDragonComponent } from './create-dragon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { DragonService } from '../../services/dragon.service';
import { noop, of, throwError } from 'rxjs';
import { Dragon } from '../../models/dragon';

describe('CreateDragonComponent', () => {
  let component: CreateDragonComponent;
  let fixture: ComponentFixture<CreateDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor - need to have correct values', () => {
    expect(component['formBuilder'] instanceof FormBuilder).toBeTruthy();
    expect(component['spinnerService'] instanceof SpinnerService).toBeTruthy();
    expect(component['dragonService'] instanceof DragonService).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();
  });

  it('On init - need to do correct call', () => {
    spyOn(component, 'createNewDragonForm').and.callFake(noop);

    component.ngOnInit();
    expect(component.createNewDragonForm).toHaveBeenCalledWith(new Dragon());
  });

  it('On init - need to do correct call', () => {
    spyOn(component, 'createNewDragonForm').and.callFake(noop);

    component.ngOnInit();
    expect(component.createNewDragonForm).toHaveBeenCalledWith(new Dragon());
  });

  it('createNewDragonForm - need to set correct value of form', () => {
    let mockDrag = new Dragon();

    component.createNewDragonForm(mockDrag);

    expect(Object.keys(component.createDragonForm.value).length).toBe(3);

    expect(component.createDragonForm.value.name).toBe('');
    expect(component.createDragonForm.value.type).toBe('');
    expect(component.createDragonForm.value.createdAt).toBe('');
  });

  it('submitCreateDragon - form invalid', () => {
    spyOn(Date.prototype, 'toISOString').and.callFake(() => {
      return '2021-01-01';
    });
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'createDragon').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // form invalid
    component.createDragonForm = component['formBuilder'].group({
      name: ['', Validators.required],
      createdAt: []
    });

    component.submitCreateDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).not.toHaveBeenCalled();
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.createDragonErrorMessage).toBe('');
    expect(component.createDragonForm.value.createdAt).toBe(null);
  });

  it('submitCreateDragon - form valid - with success', () => {
    spyOn(Date.prototype, 'toISOString').and.callFake(() => {
      return '2021-01-01';
    });
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'createDragon').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.createDragonForm = component['formBuilder'].group({
      name: ['name'],
      createdAt: []
    });

    component.submitCreateDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/dragons');
    expect(component.createDragonErrorMessage).toBe('');
    expect(component.createDragonForm.value.createdAt).toBe('2021-01-01');
  });

  it('submitCreateDragon - service return error - with message', () => {
    spyOn(Date.prototype, 'toISOString').and.callFake(() => {
      return '2021-01-01';
    });
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'createDragon').and.callFake(() => {
      return throwError({message: 'Error'});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.createDragonForm = component['formBuilder'].group({
      name: ['name'],
      createdAt: []
    });

    component.submitCreateDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.createDragonErrorMessage).toBe('Error');
    expect(component.createDragonForm.value.createdAt).toBe('2021-01-01');
  });

  it('submitCreateDragon - service returns error - without message', () => {
    spyOn(Date.prototype, 'toISOString').and.callFake(() => {
      return '2021-01-01';
    });
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'createDragon').and.callFake(() => {
      return throwError({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.createDragonForm = component['formBuilder'].group({
      name: ['name'],
      createdAt: []
    });

    component.submitCreateDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.createDragonErrorMessage).toBe('Ocorreu um erro ao tentar cadastrar o dragão');
    expect(component.createDragonForm.value.createdAt).toBe('2021-01-01');
  });


});
