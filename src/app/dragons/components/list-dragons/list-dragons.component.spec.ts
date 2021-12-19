import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListDragonsComponent } from './list-dragons.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { DragonService } from '../../services/dragon.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { noop, of, throwError } from 'rxjs';
import { Dragon } from '../../models/dragon';

let _mockedArrayDragons = [
  {
    id: '1',
    name: 'drag-1',
    type: 'type-1',
    createdAt: '2021-01-01'
  },
  {
    id: '2',
    name: 'drag-2',
    type: 'type-2',
    createdAt: '2021-01-01'
  },
  {
    id: '3',
    name: 'drag-3',
    type: 'type-3',
    createdAt: '2021-01-01'
  },
]

describe('ListDragonsComponent', () => {
  let component: ListDragonsComponent;
  let fixture: ComponentFixture<ListDragonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ ListDragonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDragonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor - need to have correct variables', () => {
    expect(component['dragonService'] instanceof DragonService).toBeTruthy();
    expect(component['spinnerService'] instanceof SpinnerService).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();
    expect(component['loginService'] instanceof LoginService).toBeTruthy();
  });

  it('ngOnInit - with success', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'getDragons').and.callFake(() => {
      return of(_mockedArrayDragons);
    });
    spyOn(component['router'], 'navigateByUrl');

    component.ngOnInit();

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('');
    expect(component.dragonsList).toEqual(
      [
        new Dragon(_mockedArrayDragons[0]),
        new Dragon(_mockedArrayDragons[1]),
        new Dragon(_mockedArrayDragons[2])
      ]
    );
  });

  it('ngOnInit - with error - with message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'getDragons').and.callFake(() => {
      return throwError({message: 'Error'});
    });
    spyOn(component['router'], 'navigateByUrl');

    component.ngOnInit();

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('Error');
    expect(component.dragonsList).toEqual([]);
  });

  it('ngOnInit - with error - without message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'getDragons').and.callFake(() => {
      return throwError({});
    });
    spyOn(component['router'], 'navigateByUrl');

    component.ngOnInit();

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('Houve um problema ao obter os dragões.');
    expect(component.dragonsList).toEqual([]);
  });

  it('removeDragonFromArray - with id in array - need to remove element correctly', () => {
    component.dragonsList =       [
      new Dragon(_mockedArrayDragons[0]),
      new Dragon(_mockedArrayDragons[1]),
      new Dragon(_mockedArrayDragons[2])
    ];

    component.removeDragonFromArray('1');

    expect(component.dragonsList).toEqual(
      [
        new Dragon(_mockedArrayDragons[1]),
        new Dragon(_mockedArrayDragons[2])
      ]
    )

  });

  it('removeDragonFromArray - without id in array - array of dragons need to be the same', () => {
    component.dragonsList =       [
      new Dragon(_mockedArrayDragons[0]),
      new Dragon(_mockedArrayDragons[1]),
      new Dragon(_mockedArrayDragons[2])
    ];

    component.removeDragonFromArray('4');

    expect(component.dragonsList).toEqual(
      [
        new Dragon(_mockedArrayDragons[0]),
        new Dragon(_mockedArrayDragons[1]),
        new Dragon(_mockedArrayDragons[2])
      ]
    )

  });

  it('deleteDragon - with success', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'deleteDragon').and.callFake(() => {
      return of({});
    });
    spyOn(component['router'], 'navigateByUrl');

    component.deleteDragon('1');

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('');
  });

  it('deleteDragon - with error - with message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'deleteDragon').and.callFake(() => {
      return throwError({message: 'Error'});
    });


    component.deleteDragon('1');

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('Error');
  });

  it('deleteDragon - with error - without message', () => {
    spyOn(component['spinnerService'], 'setLoadingStatus').and.callFake(noop);
    spyOn(component['dragonService'], 'deleteDragon').and.callFake(() => {
      return throwError({});
    });

    component.deleteDragon('1');

    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(true);
    expect(component['spinnerService'].setLoadingStatus).toHaveBeenCalledWith(false);
    expect(component.listErrorMessage).toBe('Houve um problema ao tentar remover o dragão.');
  });

  it('redirectShowDetailsDragon - - need to do correct call', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });

    component.redirectShowDetailsDragon('1');

    expect(component['router'].navigate).toHaveBeenCalledWith(['/dragons/detail', '1']);
  });

  it('redirectEditDragon - - need to do correct call', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });

    component.redirectEditDragon('1');

    expect(component['router'].navigate).toHaveBeenCalledWith(['/dragons/edit', '1']);
  });

  it('redirectCreateDragon - - need to do correct call', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });

    component.redirectCreateDragon();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/dragons/create']);
  });

  it('logout - need to do correct calls', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });
    spyOn(component['loginService'], 'logout').and.callFake(noop);

    component.logout();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });


});
