import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-component/login-component.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user-component/user-component.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AdminComponent } from './admin-component/admin-component.component';



export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component:MainComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user/:id', component: UserComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    { path: 'admin/:id', component: AdminComponent },
    { path: 'add-incident', component: AddIncidentComponent },
    { path: 'upload-file/:incId', component: UploadFileComponent },
    { path: 'admin-component', component: AdminComponent },


];