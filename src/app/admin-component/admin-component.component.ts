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
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ConfirmDialogComponent,
    EditIncidentDialogComponent,
  ],
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css'],
})
export class AdminComponent implements OnInit {
  incidents: IncidentModel[] = [];
  editingIncident: IncidentModel | null = null; // This tracks the incident being edited
  showConfirmDialog: boolean = false;
  currentIncident: IncidentModel | null = null;
  commentEnabled: boolean = true;
  currentCommentText: string = '';
  selectedIncidentId: number | null = null;
  notification: string = '';
  showNotification: boolean = false;

  constructor(
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private attachmentService: AttachmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id'); // Extract user ID from the URL

      if (userId) {
        this.incidentService.setUserId(userId);
        this.attachmentService.setUserId(userId);
        this.fetchIncidents();
      }
    });
  }

  fetchIncidents() {
    this.incidentService.getIncidents().subscribe((data) => {
      // console.log(data);
      this.incidents = data;
    });
  }

  editIncident(incident: IncidentModel) {
    this.editingIncident = { ...incident }; // Copy the incident to edit
  }

  onCancelEdit() {
    this.editingIncident = null; // Close the form without saving changes
  }

  onSubmitEdit() {
    if (this.editingIncident) {
      // Ensure the incident has all required fields before submitting
      const updatedIncident: IncidentModel = {
        incId: this.editingIncident.incId, // Ensure incId is present and valid
        incSubject: this.editingIncident.incSubject || '',
        incDescription: this.editingIncident.incDescription || '',
        status: this.editingIncident.status || '',
        createdAt: this.editingIncident.createdAt || '',
        updatedAt: this.editingIncident.updatedAt || '',
        // comments: this.editingIncident.comments
      };

      this.incidentService
        .updateIncident(updatedIncident.incId, updatedIncident)
        .subscribe({
          next: (response) => {
            // Find and update the incident in the incidents array
            const index = this.incidents.findIndex(
              (i) => i.incId === updatedIncident.incId
            );
            if (index !== -1) {
              this.incidents[index] = updatedIncident; // Replace with the updated incident
            }
            this.editingIncident = null;
            this.fetchIncidents(); // Close the edit form after submission
          },
          error: (error) => {
            console.error('Error updating incident:', error);
          },
        });
    }
  }

  deleteIncident(incident: IncidentModel) {
    this.currentIncident = incident;
    this.showConfirmDialog = true;
  }

  onConfirmDelete() {
    if (this.currentIncident) {
      this.incidentService
        .deleteIncident(this.currentIncident.incId)
        .subscribe(() => {
          this.incidents = this.incidents.filter(
            (i) => i.incId !== this.currentIncident?.incId
          );
          this.showConfirmDialog = false;
        });
    }
  }

  onCancelDelete() {
    this.showConfirmDialog = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  resolveIncident(incId: number): void {
    this.incidentService.updateStatus(incId).subscribe({
      next: (response) => {
        console.log(response);
        this.fetchIncidents();
      },
      error: (error) => {
        console.error('Error resolving incident:', error);
      },
    });
  }

  toggleCommentTextarea(incident: IncidentModel) {
    if (this.selectedIncidentId === incident.incId) {
      this.selectedIncidentId = null; // Close the textarea if it's already open for this incident
      this.currentCommentText = ''; // Reset the comment text
    } else {
      this.selectedIncidentId = incident.incId;  // Open textarea for clicked incident
      this.currentCommentText = incident.comments && incident.comments.length > 0
        ? incident.comments[incident.comments.length - 1].commentText
        : '';  // Populate with the latest comment if any
    }
  }

  addComment(incident: IncidentModel) {
    const commentData = {
      commentText: this.currentCommentText,
    };

    if(incident.status === "RESOLVED"){
      this.showSuccessNotification("cannot add comment, incident already resolved")
      return;
    }
  
    this.incidentService.addComment(incident.incId, commentData).subscribe({
      next: (response) => {
        this.fetchIncidents();  // Refresh the incidents list after comment is added
        this.selectedIncidentId = null;  // Close the textarea
        this.currentCommentText = '';  // Clear the comment text
      },
      error: (error) => {
        console.error('Error adding/updating comment:', error);
      },
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
