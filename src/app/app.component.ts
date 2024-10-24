import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';


 
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,LoginAdminComponent,LoginUserComponent,WelcomeComponent,RegisterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projectprac';
}
 
 
 