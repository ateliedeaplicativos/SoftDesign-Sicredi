import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { noop, of, throwError } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Dragon } from '../../models/dragon';
import { DragonService } from '../../services/dragon.service';

import { EditDragonComponent } from './edit-dragon.component';

describe('EditDragonComponent', () => {
  let component: EditDragonComponent;
  let fixture: ComponentFixture<EditDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[
        FormBuilder
      ],
      declarations: [ EditDragonComponent ]
    })
    .compileComponents();
  });

  let _dataMock = {
    dragon: {
      id: '1',
      name: 'dragon of fire',
      type: 'fire',
      createdAt: '2021-01-01',
    }
  }

  beforeEach(() => {

    fixture = TestBed.createComponent(EditDragonComponent);
    component = fixture.componentInstance;

    // Forcing a valid dragon
    // The resolver "DragonDetailsResolver" will check if don't have
    // We aways will have a dragon here
    component['activatedRoute'].data = of(_dataMock);

    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Constructor - need to have correct values', () => {
    expect(component['activatedRoute'] instanceof ActivatedRoute).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();
    expect(component['formBuilder'] instanceof FormBuilder).toBeTruthy();
    expect(component['spinnerService'] instanceof SpinnerService).toBeTruthy();
    expect(component['dragonService'] instanceof DragonService).toBeTruthy();
  });

  it('ngOnInit - need to set correct value and do correct call', () => {
    spyOn(component, 'createEditDragonForm').and.callFake(noop);

    component.ngOnInit();

    expect(component.originalDragon).toEqual(new Dragon(_dataMock.dragon));
    expect(component.createEditDragonForm).toHaveBeenCalledWith(new Dragon(_dataMock.dragon));
  })


  it('createEditDragonForm - need to create correctly', () => {
    expect(component).toBeTruthy();

    let mockDragon = new Dragon();

    component.createEditDragonForm(mockDragon);

    expect(Object.keys(component.editDragonForm.value).length).toBe(2);
    expect(component.editDragonForm.value.name).toBe('');
    expect(component.editDragonForm.value.type).toBe('');
  });

  it('submitEditDragon - form invalid', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'editDragon').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // form invalid
    component.editDragonForm = component['formBuilder'].group({
      userName: ['', Validators.required],
    });

    component.submitEditDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).not.toHaveBeenCalled();
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.editDragonErrorMessage).toBe('');
    expect(component.editDragonErrorMessage).toBe('');
  });

  it('submitEditDragon - form valid - with success', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'editDragon').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.editDragonForm = component['formBuilder'].group({
      userName: ['user']
    });

    component.submitEditDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/dragons');
    expect(component.editDragonErrorMessage).toBe('');
  });

  it('submitEditDragon with error - with message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'editDragon').and.callFake(() => {
      return throwError({message: 'Error'});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.editDragonForm = component['formBuilder'].group({
      userName: ['user']
    });

    component.submitEditDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.editDragonErrorMessage).toBe('Error');
  });

  it('submitEditDragon with error - without message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'editDragon').and.callFake(() => {
      return throwError({});
    });
    spyOn(component['router'], 'navigateByUrl');


    // valid form
    component.editDragonForm = component['formBuilder'].group({
      userName: ['user']
    });

    component.submitEditDragon();

    expect(component.isSubmitted).toBeTrue();
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    expect(component.editDragonErrorMessage).toBe('Ocorreu um erro ao tentar editar o dragão');
  });


});
