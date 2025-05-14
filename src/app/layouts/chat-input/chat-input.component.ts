import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Input() control: FormControl = new FormControl('');
  @Output() send = new EventEmitter<void>();

  onSend() {
    if (this.control.value?.trim()) {
      this.send.emit();
    }
  }
}
