import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-create-incident',
  standalone: true,
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.css'],
  imports: [NgIf, FormsModule]  // Use FormsModule for two-way binding
})
export class CreateIncidentComponent {
  incidentTitle: string = '';
  incidentDescription: string = '';
  selectedFile: File | null = null;
  isFileUploadSection: boolean = false;
 
  // Triggered when "Next" button is clicked
  onNext() {
    if (this.incidentTitle && this.incidentDescription) {
      this.isFileUploadSection = true;
    } else {
      alert('Please fill out both fields.');
    }
  }
 
  // File selection handler
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
 
  // Submitting the incident
  onSubmit() {
    if (this.selectedFile) {
      const incidentData = {
        title: this.incidentTitle,
        description: this.incidentDescription,
        file: this.selectedFile
      };
 
      console.log('Incident submitted:', incidentData);
      // You can replace the console log with your backend call to submit the incident
    } else {
      alert('Please upload a file before submitting.');
    }
  }
}