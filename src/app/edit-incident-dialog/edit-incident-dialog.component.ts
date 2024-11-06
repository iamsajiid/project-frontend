import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidentModel } from '../Incident.model';
 
@Component({
  selector: 'app-edit-incident-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-incident-dialog.component.html',
  styleUrls: ['./edit-incident-dialog.component.css']
})
export class EditIncidentDialogComponent {
 
  @Input() data: IncidentModel | null = null;
  @Output() submit = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
 
  // Ensure data is never null in the template
  get incidentData(): IncidentModel {
    return this.data || { incId: 0, incSubject: '', incDescription: '', status: '', createdAt: '' };
  }
 
  onSubmit() {
    this.submit.emit(true);
  }
 
  onCancel() {
    this.cancel.emit();
  }
}