import { Component, Inject, Optional } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dislike-modal',
  standalone: true,
  imports: [MaterialModule,NgIf],
  templateUrl: './dislike-modal.component.html',
  styleUrl: './dislike-modal.component.scss'
})
export class DislikeModalComponent {
   feedbackText = new FormControl('', [Validators.required]);
  isDialog = false;

  constructor(
    @Optional() public dialogRef: MatDialogRef<DislikeModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Check if this component is opened as a dialog
    this.isDialog = !!this.dialogRef;
  }

  onCancel(): void {
    if (this.isDialog) {
      this.dialogRef.close();
    }
    // Handle case when not in dialog mode
    console.log('Cancel clicked');
  }

  onSubmit(): void {
    if (this.feedbackText.valid) {
      if (this.isDialog) {
        this.dialogRef.close(this.feedbackText.value);
      } else {
        // Handle case when not in dialog mode
        console.log('Feedback submitted:', this.feedbackText.value);
      }
    }
  }
}
