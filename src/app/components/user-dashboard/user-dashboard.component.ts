import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../incident.service';
import { AuthService } from '../../auth-service.service';
import { Incident } from '../../incidents';  // Import your Incident model
import { Router } from '@angular/router'; // Import Router for navigation
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone:true,
  imports:[MatTableModule]
})
export class UserDashboardComponent implements OnInit {
  incidents: Incident[] = [];  // Array to hold incidents
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'priority', 'createdAt', 'updatedAt', 'action']; // Define columns to be displayed

  constructor(private incidentService: IncidentService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchUserIncidents();
  }

  fetchUserIncidents() {
    const userId = this.authService.getCurrentUserId();  // Get user ID from JWT token
    if (userId !== null) {  // Check if userId is not null before fetching incidents
      this.incidentService.getIncidentList().subscribe(
        (data: Incident[]) => {
          // Filter incidents by userId
          this.incidents = data.filter(incident => incident.userId === userId);
        },
        (error) => {
          console.error('Error fetching incidents:', error);
        }
      );
    } else {
      console.error('User ID not found. User might not be logged in.'); // Handle the case when userId is null
    }
  }

  // Method to navigate to create incident
  createIncident() {
    this.router.navigate(['/create-incident']);
  }

  // Method to handle file download
  downloadFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  // Method to update incident
  updateIncident(incident: Incident) {
    this.incidentService.updateIncident(incident.id, incident).subscribe(
      (response) => {
        console.log('Incident updated successfully', response);
        this.fetchUserIncidents(); // Refresh the incidents after updating
      },
      (error) => {
        console.error('Error updating incident:', error);
      }
    );
  }

  // Method to delete incident
  deleteIncident(id: number) {
    this.incidentService.deleteIncident(id).subscribe(
      (response) => {
        console.log('Incident deleted successfully', response);
        this.snackBar.open('Incident deleted successfully', 'Close', { duration: 3000 }); // Show success message
        this.fetchUserIncidents(); // Refresh the incidents list
      },
      (error) => {
        console.error('Error deleting incident:', error);
        this.snackBar.open('Error deleting incident', 'Close', { duration: 3000 }); // Show error message
      }
    );
  }
}
