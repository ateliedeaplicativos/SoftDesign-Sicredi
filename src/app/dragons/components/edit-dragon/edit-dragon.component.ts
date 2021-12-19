import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Dragon } from '../../models/dragon';
import { DragonService } from '../../services/dragon.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-edit-dragon',
  templateUrl: './edit-dragon.component.html',
  styleUrls: ['./edit-dragon.component.scss']
})
export class EditDragonComponent implements OnInit {

  originalDragon: Dragon = new Dragon({});
  isSubmitted: boolean = false;
  editDragonForm!: FormGroup;
  editDragonErrorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private dragonService: DragonService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.originalDragon = new Dragon(data.dragon);
        this.createEditDragonForm(new Dragon(data.dragon));
      }
    );
  }

  createEditDragonForm(dragon: Dragon) {
    this.editDragonForm = this.formBuilder.group({
      name: [dragon.name, Validators.required],
      type: [dragon.type, Validators.required]
    });
  }

  submitEditDragon() {
    this.isSubmitted = true;
    this.editDragonErrorMessage = '';

    if (this.editDragonForm.invalid) {
      return;
    }
    this.spinnerService.setLoadingStatus(true);

    this.dragonService.editDragon(this.originalDragon.id, this.editDragonForm.value)
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
          this.editDragonErrorMessage = (error && error.message)? error.message : 'Ocorreu um erro ao tentar editar o dragão';
        },
      });

  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
