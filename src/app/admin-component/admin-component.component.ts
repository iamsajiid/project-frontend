import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponent {

  constructor(private incidentService: IncidentService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  logout(){
    this.authService.logout()
    this.router.navigate(['/main']);
  }
}
