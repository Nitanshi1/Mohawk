import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sql-modal',
  standalone: true,
  imports: [MaterialModule,NgIf],
  templateUrl: './sql-modal.component.html',
  styleUrl: './sql-modal.component.scss'
})
export class SqlModalComponent {
    isDialog = false;
  // constructor(@Inject(MAT_DIALOG_DATA) public data: { sqlQuery: string }) {}
 @Input() sqlQuery: string = `SELECT [No_], [Name], [Vendor Name], [Start Date],[End Date]
FROM [Contract Header]
WHERE [End Date] >= DATEADD(month, 2, GETDATE())
AND [End Date] <= GETDATE();`;
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() copyQuery = new EventEmitter<string>();

  onCancel(): void {
    this.closeModal.emit();
  }

  onCopyQuery(): void {
    this.copyQuery.emit(this.sqlQuery);
    
    // Optional: Add clipboard functionality directly
    navigator.clipboard.writeText(this.sqlQuery)
      .then(() => console.log('SQL query copied to clipboard'))
      .catch(err => console.error('Could not copy text: ', err));
  }
   
}
