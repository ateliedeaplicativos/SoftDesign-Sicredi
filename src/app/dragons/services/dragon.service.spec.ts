import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DragonService } from './dragon.service';

describe('DragonService', () => {
  let service: DragonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(DragonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
