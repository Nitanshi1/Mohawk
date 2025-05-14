import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-startchat',
  standalone: true,
  imports: [MaterialModule,SidebarComponent,NgFor ],
  templateUrl: './startchat.component.html',
  styleUrl: './startchat.component.scss'
})
export class StartchatComponent {
  chatForm: FormGroup;
 response: string = '';
userId: string = 'DB69E171-1088-45AE-B619-339640A5FE1E'; // Replace with dynamic value if needed
conversationId: string = '2c8c9d0d-6616-4865-8919-0987e20de8bb'; // Replace or generate as needed
messages: any;

  constructor(private fb: FormBuilder, private chatService: ChatService) {
this.chatForm = this.fb.group({
  question: [''],
});
  }

  // sendMessage(): void {
  //   const question = this.chatForm.value.question?.trim();
  //   if (!question) return;

  //   this.chatService.askQuestion(this.userId, this.conversationId, question)
  //     .subscribe({
  //       next: (res) => {
  //         this.response = res?.answer || 'No response received.';
  //         this.chatForm.reset();
  //       },
  //       error: (err) => {
  //         console.error('API Error:', err);
  //         this.response = 'Something went wrong. Please try again later.';
  //       },
  //     });
  // }

  
  sendMessage(): void {
    const question = this.chatForm.value.question?.trim();
    if (!question) return;

    // Add user message to chat
    this.messages.push({
      text: question,
      isUser: true,
      timestamp: new Date()
    });

    this.chatService.askQuestion(this.userId, this.conversationId, question)
      .subscribe({
        next: (res) => {
          const response = res?.answer || 'No response received.';
          // Add bot response to chat
          this.messages.push({
            text: response,
            isUser: false,
            timestamp: new Date()
          });
          this.chatForm.reset();
        },
        error: (err) => {
          console.error('API Error:', err);
          // Add error message to chat
          this.messages.push({
            text: 'Something went wrong. Please try again later.',
            isUser: false,
            timestamp: new Date()
          });
        },
      });
  }
  startNewChat(){
    
  }
}
