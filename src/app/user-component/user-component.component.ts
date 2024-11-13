import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentModel } from '../Incident.model';
import { IncidentService } from '../incident.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditIncidentDialogComponent } from '../edit-incident-dialog/edit-incident-dialog.component';
import { AttachmentService } from '../attachment.service';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [FormsModule,CommonModule, ConfirmDialogComponent, EditIncidentDialogComponent],
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})

export class UserComponent implements OnInit {
 
  incidents: IncidentModel[] = [];
  editingIncident: IncidentModel | null = null;  // This tracks the incident being edited
  showConfirmDialog: boolean = false;
  currentIncident: IncidentModel | null = null;

  constructor(
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private attachmentService: AttachmentService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id'); // Extract user ID from the URL
      if (userId) {
        this.incidentService.setUserId(userId);
        this.attachmentService.setUserId(userId);
        // // Extract the role from the JWT token
        // const role = this.getRoleFromToken();  // You can define this method to extract the role
  
        // if (role) {
        //   // Set the role in the services or handle accordingly
        //   console.log('Role from token:', role);
        //   this.incidentService.setRole(role);  // Assuming you have a setRole method in your service
        //   // this.attachmentService.setRole(role);
  
        //   // Optionally, you can update the URL or redirect based on role if needed
        //   // For example, if the role is admin, you could set different base URL or make certain API calls
        // } else {
        //   console.error('Role is missing from the token');
        // }
        this.fetchIncidents();
      }
    });
  }
  
  // private getRoleFromToken(): string | null {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // Decode the token (split by "." to get the payload part)
  //     const payload = atob(token.split('.')[1]); // Decode base64
  //     console.log('Decoded Payload:', payload);  // Log decoded payload for debugging
  
  //     try {
  //       const decoded = JSON.parse(payload);  // Parse payload to a JSON object
  //       console.log('Decoded Object:', decoded);  // Log the parsed object
  
  //       // Check if the roles array exists and extract the role
  //       if (decoded.roles && decoded.roles.length > 0) {
  //         return decoded.roles[0].authority || null;  // Extract the first role's authority
  //       } else {
  //         return null;  // No role found
  //       }
  //     } catch (e) {
  //       console.error('Error decoding token:', e);
  //       return null;  // Return null if the token is invalid or parsing failed
  //     }
  //   }
  //   return null;  // Return null if no token is found
  // }
  
  fetchIncidents() {
    this.incidentService.getIncidents().subscribe(data => {
      this.incidents = data;
      // Optional: this.sortIncidentsByPriority();
    });
  }

  createIncident(){
    this.router.navigate([`/add-incident`])
  }

  editIncident(incident: IncidentModel) {
    this.editingIncident = { ...incident };  // Copy the incident to edit
  }

  onCancelEdit() {
    this.editingIncident = null;  // Close the form without saving changes
  }
 
  onSubmitEdit() {
    if (this.editingIncident) {
      // Ensure the incident has all required fields before submitting
      const updatedIncident: IncidentModel = {
        incId: this.editingIncident.incId,  // Ensure incId is present and valid
        incSubject: this.editingIncident.incSubject || '',
        incDescription: this.editingIncident.incDescription || '',
        status: this.editingIncident.status || '',
        createdAt: this.editingIncident.createdAt || '',
        updatedAt: this.editingIncident.updatedAt || ''
      };
 
      this.incidentService.updateIncident(updatedIncident.incId, updatedIncident).subscribe({
        next: (response) => {
          // Find and update the incident in the incidents array
          const index = this.incidents.findIndex(i => i.incId === updatedIncident.incId);
          if (index !== -1) {
            this.incidents[index] = updatedIncident;  // Replace with the updated incident
          }
          this.editingIncident = null;
          this.fetchIncidents() // Close the edit form after submission
        },
        error: (error) => {
          console.error('Error updating incident:', error);
        }
      });
    }
  }
 
  deleteIncident(incident: IncidentModel) {
    this.currentIncident = incident;
    this.showConfirmDialog = true;
  }
 
  onConfirmDelete() {
    if (this.currentIncident) {
      this.incidentService.deleteIncident(this.currentIncident.incId).subscribe(() => {
        this.incidents = this.incidents.filter(i => i.incId !== this.currentIncident?.incId);
        this.showConfirmDialog = false;
      });
    }
  }
 
  onCancelDelete() {
    this.showConfirmDialog = false;
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/main']);
  }

  downloadIncident(incident: IncidentModel): void {
    console.log("download method incident -- ", incident);
    this.incidentService.downloadIncident(Number(incident.incId)).subscribe({
      next: (fileBlob: Blob) => {
        const url = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `incident_report_${incident.incId}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      }
    });
  }
}
