import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
 
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Add CommonModule to imports
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = ''; // New property for message
 
  onSubmit() {
    // Handle admin login logic here (e.g., API call)
    this.loginMessage = 'Admin logged in successfully!';
    // Optionally reset the form fields
    this.username = '';
    this.password = '';
  }
}