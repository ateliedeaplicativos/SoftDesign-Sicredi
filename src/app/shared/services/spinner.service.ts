import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoadingStatus(value: boolean) {
    this.loadingStatus.next(value);
  }
}
