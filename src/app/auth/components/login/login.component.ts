import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isSubmitted: boolean = false;
  loginErrorMessage: string = '';

  logoSicredi: string = "https://www.sicredi.com.br/static/home/assets/header/logo-svg2.svg";

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createFormLogin(new User());
  }

  createFormLogin(user: User) {
    this.formLogin = this.formBuilder.group({
      userName: [user.userName, Validators.required],
      password: [user.password, Validators.required]
    });
  }

  login() {
    this.loginErrorMessage = '';
    this.isSubmitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    // loading spinner
    this.spinnerService.setLoadingStatus(true);

    this.loginService.login(this.formLogin.value)
      .pipe(
        finalize(() => {
          this.spinnerService.setLoadingStatus(false);
        })
      )
      .subscribe({
        next: event => {
          this.router.navigateByUrl('/dragons');
        },
        error: error => {
          this.loginErrorMessage = (error && error.message) ? error.message : 'Houve um erro ao tentar se logar';
        },
      });
  }

}
