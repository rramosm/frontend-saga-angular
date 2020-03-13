import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'List of Users' }
  },
  {
    path: 'users-details/:userId',
    component: UsersDetailsComponent,
    data: { title: 'Users Details' }
  },
  {
    path: 'add-users',
    component: AddUsersComponent,
    data: { title: 'Add Users' }
  },
  {
    path: 'edit-users/:userId',
    component: EditUsersComponent,
    data: { title: 'Edit Users' }
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
