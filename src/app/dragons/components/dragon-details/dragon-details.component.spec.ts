import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Dragon } from '../../models/dragon';
import { DragonDetailsComponent } from './dragon-details.component';
import { ActivatedRoute } from '@angular/router';

describe('DragonDetailsComponent', () => {
  let component: DragonDetailsComponent;
  let fixture: ComponentFixture<DragonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[],
      declarations: [ DragonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dragon).toEqual(new Dragon());
  });

  it('constructor - need to have correct values', () => {
    expect(component['activatedRoute'] instanceof ActivatedRoute).toBeTruthy();
  });

  it('onInit - need to get correct value', () => {
        component.ngOnInit();
  });
});
