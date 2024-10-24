import { Component } from '@angular/core';
import { AuthService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'user';  // Default to 'user', but can be 'admin' based on role selection
  registrationMessage:string='';
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const registrationData = { username: this.username, password: this.password, role: this.role };
    this.authService.register(registrationData).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/auth/login']);  // Redirect to login after successful registration
      },
      error => {
        console.error('Registration failed:', error);
        // Display error message to the user
      }
    );
  }
}
