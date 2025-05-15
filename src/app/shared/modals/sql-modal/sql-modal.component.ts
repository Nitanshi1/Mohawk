import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sql-modal',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './sql-modal.component.html',
  styleUrl: './sql-modal.component.scss'
})
export class SqlModalComponent {
  @Input() sqlQuery: string | null = null; // Make nullable
  @Input() visible = false; // For non-dialog usage
  @Output() closed = new EventEmitter<void>();
  @Output() queryCopied = new EventEmitter<void>();

  onClose(): void {
    this.closed.emit();
  }

  onCopy(): void {
    if (this.sqlQuery) {
      navigator.clipboard.writeText(this.sqlQuery)
        .then(() => {
          console.log('SQL query copied to clipboard');
          this.queryCopied.emit();
        })
        .catch(err => console.error('Could not copy text: ', err));
    }
  }
}