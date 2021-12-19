import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    if(this.loginService.isLogged()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
