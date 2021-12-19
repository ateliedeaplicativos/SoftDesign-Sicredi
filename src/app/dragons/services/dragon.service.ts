import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Dragon } from '../models/dragon';

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  private readonly PATH_API: string = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

  constructor(
    private apiService: ApiService,
  ) { }

  getDragons() {
    return this.apiService.get(this.PATH_API);
  }

  getDragon(dragonId: string) {
    return this.apiService.get(`${this.PATH_API}/${dragonId}`);
  }

  createDragon(dragon: Object) {
    return this.apiService.post(this.PATH_API, dragon);
  }

  editDragon(dragonId: string, dragon: Object) {
    return this.apiService.put(`${this.PATH_API}/${dragonId}`, dragon);
  }

  deleteDragon(DragonId: string) {
    return this.apiService.delete(`${this.PATH_API}/${DragonId}`);
  }


}
