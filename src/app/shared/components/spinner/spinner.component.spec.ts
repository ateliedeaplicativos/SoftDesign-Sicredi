import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Constructor - need to have correct values', () => {
    expect(component['spinnerService'] instanceof SpinnerService).toBeTruthy();
  });

  it("ngOnInit - need to create correct subscribe - set false", () => {

    component.ngOnInit();

    component['spinnerService'].setLoadingStatus(false);

    expect(component['showSpinner']).toBeFalse()

  });

  it("ngOnInit - need to create correct subscribe - set true", () => {

    component.ngOnInit();

    component['spinnerService'].setLoadingStatus(true);

    expect(component['showSpinner']).toBeTrue()
  });

  it('show - need to change correctly', () => {
    component.showSpinner = false;

    component.show()
    expect(component.showSpinner).toBeTruthy();
  });

  it('show - need to change correctly', () => {
    component.showSpinner = true;

    component.hide()
    expect(component.showSpinner).toBeFalse();
  });

});
