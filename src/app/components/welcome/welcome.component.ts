import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports:[]
})
export class WelcomeComponent {
  constructor(private router: Router) {}
 
  goToUserLogin() {
    this.router.navigate(['/login-user']);
  }
 
  goToAdminLogin() {
    this.router.navigate(['/login-admin']);
  }
 
  goToRegister() {
    this.router.navigate(['/register']);
  }
}