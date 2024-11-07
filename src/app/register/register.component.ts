import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        // Optionally navigate to login page or auto-login
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Registration failed', error);
      }
    });
  }

  redirectToLogin(){
    this.router.navigate([`/login`])
  }
}
