import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login-component/login-component.component";
import { UserComponent } from './user-component/user-component.component';
import { RegisterComponent } from './register/register.component';
import { EditIncidentDialogComponent } from './edit-incident-dialog/edit-incident-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, UserComponent, RegisterComponent, EditIncidentDialogComponent, ConfirmDialogComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
