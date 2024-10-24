import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterComponent } from './components/register/register.component';
import {UserDashboardComponent} from './components/user-dashboard/user-dashboard.component';

 
const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component:WelcomeComponent },
  { path: 'auth/login-user', component: LoginUserComponent },
  { path: 'auth/login-admin', component: LoginAdminComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'user/:id/dashboard', component: UserDashboardComponent },
  { path: '', redirectTo: 'auth/login-user', pathMatch: 'full' } 
];

NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
 
export default routes;


