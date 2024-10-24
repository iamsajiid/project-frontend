import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Incident } from '../../incidents';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone:true,
  imports:[]
})
export class AdminDashboardComponent implements OnInit {
  incidents: Incident[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'priority', 'createdAt', 'updatedAt', 'comment', 'action'];

  constructor(private incidentService: IncidentService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents() {
    this.incidentService.getIncidentList().subscribe(
      (data: Incident[]) => {
        this.incidents = data;
      },
      error => {
        console.error('Error fetching incidents:', error);
        this.snackBar.open('Failed to load incidents', 'Close', { duration: 3000 });
      }
    );
  }

  commentOnIncident(incident: Incident, comment: string) {
    incident.status = 'Work in Progress';
    // You can implement the logic to send the comment to the backend here.
    // For example:
    // this.incidentService.commentOnIncident(incident.id, comment).subscribe(...);
    this.snackBar.open(`Comment added: ${comment}`, 'Close', { duration: 3000 });
  }

  resolveIncident(incident: Incident) {
    incident.status = 'Resolved';
    // Call the API to update the status in the backend
    this.incidentService.updateIncident(incident.id, incident).subscribe(
      () => {
        this.snackBar.open('Incident resolved successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error resolving incident:', error);
        this.snackBar.open('Failed to resolve incident', 'Close', { duration: 3000 });
      }
    );
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }
}
