import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})

export class LoginComponent {
  username: string = "";
  password: string = "";
  notification: string = '';
  showNotification: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.jwt);

        const decodedToken: any = jwtDecode(response.jwt);
        const userId = decodedToken.userId;
        const role = String(decodedToken.roles[0].authority);

        // console.log("token --", decodedToken)
        // console.log("userId --", userId)
        // console.log("role --", role.toLowerCase())

        this.router.navigate([`/${role.toLowerCase()}/${userId}`]);
      },
      error: error => {
        this.showSuccessNotification("please enter correct credentials.")
        // console.error('Login failed', error);
      }
    });
  }

  showSuccessNotification(message: string) {
    this.notification = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.notification = '';
    }, 3000);
}
}
