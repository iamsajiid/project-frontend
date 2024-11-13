import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IncidentModel } from '../Incident.model';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-incident.component.html',
  styleUrl: './add-incident.component.css'
})
export class AddIncidentComponent {
  userId: string | null = null; 
  role : string | null = null;
  notification: string = '';
  showNotification: boolean = false;
  incident: IncidentModel = { incId: 0, incSubject: '', incDescription: '' };
  
  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId;
      this.role = String(decodedToken.roles[0].authority);  // Assign the userId to the class variable
    }
  }
    
  createIncident(incidentForm: NgForm) {
    if (!this.incident.incSubject || !this.incident.incDescription) {
      this.showSuccessNotification('Please enter all fields.');
      return;
    }
    
    this.incidentService.addIncident(this.incident)
    .pipe(
      tap(response => {
          // console.log('Incident created:', response);
          this.showSuccessNotification('Incident has been created!');

          const responseObj = JSON.parse(response)
          // console.log(responseObj)
          this.router.navigate([`/upload-file/${responseObj.incId}`]);
          
          incidentForm.resetForm();
          this.incident = { incId: 0, incSubject: '', incDescription: '' }
          // if (this.role && this.userId) {
          //   this.router.navigate([`/${this.role.toLowerCase()}/${this.userId}`]);

          // } else {
          //   console.error('Role or User ID is missing.');
          // }
        }),
        
        catchError(error => {
          console.error('Error creating incident:', error);
          this.showSuccessNotification('Failed to create incident.');
          return of(null);
        })
      )
      .subscribe();
  }
  
    showSuccessNotification(message: string) {
      this.notification = message;
      this.showNotification = true;
  
      setTimeout(() => {
        this.showNotification = false;
        this.notification = '';
      }, 3000);
  }

  onGoBack() {
    // this.router.navigate([`/user/${this.userId}`]);
    window.history.back();
  }

}
