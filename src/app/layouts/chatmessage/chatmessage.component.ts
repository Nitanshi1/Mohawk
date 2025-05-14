import { Component, Input } from '@angular/core';
import {ChatMessage} from '../../layouts/chatbot/chatbot.component'
import { MaterialModule } from '../../shared/material/material.module';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-chatmessage',
  standalone: true,
  imports: [MaterialModule,DatePipe],
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.scss'
})
export class ChatmessageComponent {
@Input() message!: ChatMessage;
}
