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
        this.attachmentService.setUserId(userId); // Set user ID in the service
        this.fetchIncidents(); // Fetch incidents after setting user ID
      }
    });
  }

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
 
 
  // deleteIncident(incident: IncidentModel) {
  //   if (confirm(`Are you sure you want to delete incident ${incident.incId}?`)) {
  //     this.incidentService.deleteIncident(incident.incId).subscribe({
  //       next: () => {
  //         this.incidents = this.incidents.filter(i => i.incId !== incident.incId);
  //       },
  //       error: (error) => {
  //         console.error('Error deleting incident:', error);
  //       }
  //     });
  //   }
  // }
 
 
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

  downloadIncident(incident: IncidentModel){
    console.log("download method incident -- ", incident)
    this.incidentService.downloadIncident(Number(incident.incId)).subscribe({
      next: (fileBlob: Blob) => {
        // Create an object URL for the Blob
        const url = window.URL.createObjectURL(fileBlob);
  
        // Create an invisible <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `incident_report_${incident.incId}.xlsx`;  // Set the file name
  
        // Append the <a> element to the DOM, click it, and remove it
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);  // Clean up the object URL after download
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      }
    });
  }
}
