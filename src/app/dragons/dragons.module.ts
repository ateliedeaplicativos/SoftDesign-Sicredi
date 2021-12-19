import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDragonsComponent } from './components/list-dragons/list-dragons.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { ArraySortPipe } from '../shared/pipes/array-sort.pipe';
import { CreateDragonComponent } from './components/create-dragon/create-dragon.component';
import { EditDragonComponent } from './components/edit-dragon/edit-dragon.component';
import { DragonDetailsComponent } from './components/dragon-details/dragon-details.component';
import { DragonDetailsResolver } from './resolvers/dragon-details.resolver';


const routes = [
  {
    path: '',
    component: ListDragonsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateDragonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DragonDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      dragon: DragonDetailsResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditDragonComponent,
    canActivate: [AuthGuard],
    resolve: {
      dragon: DragonDetailsResolver
    }
  },
];


@NgModule({
  declarations: [
    ListDragonsComponent,
    ArraySortPipe,
    CreateDragonComponent,
    EditDragonComponent,
    DragonDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DragonsModule { }
