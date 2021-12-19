import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { Dragon } from '../../models/dragon';
import { DragonService } from '../../services/dragon.service';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner.service';


@Component({
  selector: 'app-list-dragons',
  templateUrl: './list-dragons.component.html',
  styleUrls: ['./list-dragons.component.scss']
})
export class ListDragonsComponent implements OnInit {

  dragonsList: Array<Dragon> = [];
  listErrorMessage: string = '';

  constructor(
    private dragonService: DragonService,
    private spinnerService: SpinnerService,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.spinnerService.setLoadingStatus(true);
    this.dragonService.getDragons()
    .pipe(
      finalize(() => {
        this.spinnerService.setLoadingStatus(false);
      })
    )
    .subscribe({
      next: (dragons: Array<any>) => {
        dragons.forEach((drag: any) => {
          this.dragonsList.push(new Dragon(drag))
        });
      },
      error: error => {
        this.listErrorMessage = (error && error.message) ? error.message : 'Houve um problema ao obter os dragões.';
      },
    });
  }

  removeDragonFromArray(dragonIdRemoved: string) {
    this.dragonsList.forEach((dragon, index) => {
      if(dragon.id === dragonIdRemoved) {
        this.dragonsList.splice(index, 1);
      }
    });
  }

  deleteDragon(dragonId: string) {
    this.spinnerService.setLoadingStatus(true);
    this.dragonService.deleteDragon(dragonId)
    .pipe(
      finalize(() => {
        this.spinnerService.setLoadingStatus(false);
      })
    )
    .subscribe({
      next: () => {
        this.removeDragonFromArray(dragonId);
      },
      error: error => {
        this.listErrorMessage = (error && error.message) ? error.message : 'Houve um problema ao tentar remover o dragão.';
      },
    });
  }

  redirectShowDetailsDragon(dragonId: string) {
    this.router.navigate(['/dragons/detail', dragonId]);
  }

  redirectEditDragon(dragonId: string) {
    this.router.navigate(['/dragons/edit', dragonId]);
  }

  redirectCreateDragon() {
    this.router.navigate(['/dragons/create']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
