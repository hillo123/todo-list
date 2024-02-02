import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  Routes,
  createUrlTreeFromSnapshot,
} from '@angular/router';

import { UserService } from './services/user.service';
import { EditComponent } from './components/edit/edit.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TodolistComponent } from './components/todolist/todolist.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [],
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [
      (next: ActivatedRouteSnapshot) => {
        return inject(UserService).isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(next, ['/', 'signin']);
      },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [],
  },
  {
    path: 'todolist',
    component: TodolistComponent,
    canActivate: [
      (next: ActivatedRouteSnapshot) => {
        return inject(UserService).isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(next, ['/', 'signin']);
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
