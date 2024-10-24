import { Component } from '@angular/core';
import { AuthService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class LoginUserComponent {
  username: string = '';
  password: string = '';
  loginMessage:string='';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { username: this.username, password: this.password };
    this.authService.loginUser(credentials).subscribe(
      (response: any) => {
        const jwtToken = response.token;
        const decodedToken = this.authService.decodeToken(jwtToken);
        const userId = decodedToken.id;

        // Navigate to the user dashboard after successful login
        this.router.navigate([`/user/${userId}`]);
      },
      error => {
        console.error('Login failed:', error);
        // You can display an error message to the user here
      }
    );
  }
}
