import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor } from '@angular/common';
import { ChatmessageComponent } from '../chatmessage/chatmessage.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [MaterialModule,SidebarComponent,NgFor,ChatmessageComponent,ChatInputComponent,NgFor],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})


export class ChatbotComponent {
chatForm: FormGroup;
  messageControl: FormControl;
  messages: ChatMessage[] = [
    {
      sender: 'bot',
      content: 'Welcome to Mohawk Medbuy AI. How can I help you today?',
      timestamp: new Date()
    },
    {
      sender: 'user',
      content: 'Which contracts have expired in the past 2 months?',
      timestamp: new Date()
    },
    {
      sender: 'bot',
      content: 'Thinking...',
      timestamp: new Date()
    }
  ];

  constructor(private fb: FormBuilder) {
    this.messageControl = new FormControl('');
    this.chatForm = this.fb.group({
      message: this.messageControl
    });
  }

  sendMessage() {
    const message = this.messageControl.value;
    if (message.trim()) {
      this.messages.push({
        sender: 'user',
        content: message,
        timestamp: new Date()
      });
      
      // Simulate bot response
      setTimeout(() => {
        this.messages.push({
          sender: 'bot',
          content: 'I found 3 contracts that expired in the past 2 months...',
          timestamp: new Date()
        });
      }, 1000);
      
      this.messageControl.reset();
    }
  }
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}