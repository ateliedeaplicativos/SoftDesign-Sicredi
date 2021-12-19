import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.loadingStatus.subscribe((val: boolean) => {
      this.showSpinner = val;
    });
  }

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }

}
