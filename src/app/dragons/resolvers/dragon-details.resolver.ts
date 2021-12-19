import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DragonService } from '../services/dragon.service';

@Injectable({
  providedIn: 'root'
})
export class DragonDetailsResolver implements Resolve<boolean> {
  constructor(
    private dragonService: DragonService,
    private router: Router
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.dragonService.getDragon(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/dragons') ))
  }
}
