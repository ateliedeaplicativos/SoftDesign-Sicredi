import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dragon } from '../../models/dragon';
import { LoginService } from 'src/app/auth/services/login.service';
import { DragonService } from '../../services/dragon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {

  dragon: Dragon = new Dragon();

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private dragonService: DragonService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.dragon = new Dragon(data.dragon);
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
