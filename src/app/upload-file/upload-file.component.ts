import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentService } from '../attachment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { IncidentService } from '../incident.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})

export class UploadFileComponent {

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  selectedFile: File | null = null;
  resetChoice: boolean = false;
  notification: string = '';
  showNotification: boolean = false;
  errorMessage: string | null = null;
  incId: string | null = null;
  userId: string | null = null;
  role: string = ""

  constructor(
    private route: ActivatedRoute,
    private attachmentService: AttachmentService,
    private router: Router,
    private incidentService: IncidentService
  ) {
    const response = localStorage.getItem("token");
    if (response) {
      const decodedToken: any = jwtDecode(response);
      this.userId = decodedToken.userId;
      this.role = String(decodedToken.roles[0].authority);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.incId = params.get('incId'); // Extract user ID from the URL
      // console.log("in init uploadFileComponent -- ", this.incId)
      if (this.incId) {
        this.attachmentService.setIncId(this.incId); // Set user ID in the service
        // this.attachmentService(); // Fetch incidents after setting user ID
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.resetChoice = true;
    }
  }

  // Method to handle file upload
  onUploadFile(): void {
    // console.log("onUploadFile, incidentId -- ", this.incId)
    // console.log("onUploadFile, selectedFile -- ", this.selectedFile)

    if (!this.selectedFile || !this.incId) {
      this.errorMessage = 'Please select a file and ensure the incident ID is present.';
      return;
    }


    // Call the attachment service to upload the file
    this.attachmentService.uploadFile(this.incId, this.selectedFile).subscribe({
      next: (event) => {
        this.showSuccessNotification('file uploaded successfully.');
        return;
      },
      error: (error) => {
        // console.error('Upload failed:', error);
        this.errorMessage = 'File upload failed. Please try again later.';
      }
    });

    this.router.navigate([`/${this.role.toLowerCase()}/${this.userId}`]);
  }

  // Method to cancel the upload
  onCancelUpload(): void {
    this.selectedFile = null;
    this.errorMessage = null;
    window.history.back()
    if (this.incId) {
      // console.log("cancel button method -- ", this.incId)
      this.incidentService.deleteIncident(Number(this.incId)).subscribe(() => {
        // this.incidents = this.incidents.filter(i => i.incId !== this.currentIncident?.incId);
      })
    }
  }

  onResetUpload(): void {
    this.selectedFile = null;
    this.errorMessage = null;
    this.resetChoice = false;
    
    // Reset the file input value
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  showSuccessNotification(message: string) {
    this.notification = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.notification = '';
    }, 3000);
  }

  createAndGoToMain(){
    this.router.navigate([`${this.role.toLowerCase()}/${this.userId}`])
  }
}

