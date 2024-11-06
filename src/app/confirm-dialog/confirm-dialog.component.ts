// import { Component } from '@angular/core';
// import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
 
// @Component({
//   selector: 'app-confirm-dialog',
//   standalone: true,
//   imports: [MatDialogModule],
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.css']
// })
// export class ConfirmDialogComponent {
//   constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
 
//   onCancel(): void {
//     this.dialogRef.close(false);
//   }
 
//   onConfirm(): void {
//     this.dialogRef.close(true);
//   }
// }
 
import { Component, EventEmitter, Output } from '@angular/core';
 
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
 
  @Output() confirm = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
 
  onConfirm() {
    this.confirm.emit(true);
  }
 
  onCancel() {
    this.cancel.emit();
  }
}