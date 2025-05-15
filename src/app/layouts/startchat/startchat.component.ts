import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-startchat',
  standalone: true,
  imports: [MaterialModule,SidebarComponent,NgFor,CommonModule ],
  templateUrl: './startchat.component.html',
  styleUrl: './startchat.component.scss'
})
export class StartchatComponent {
  chatForm: FormGroup;
 response: string = '';
userId: string = 'DB69E171-1088-45AE-B619-339640A5FE1E'; // Replace with dynamic value if needed
conversationId!: string ; // Replace or generate as needed

counter:number=0;
// messages=[{type:'question',message:'abcd'},{type:'answer',message:'abcd'}]
messages:any=[]
  constructor(private fb: FormBuilder, private chatService: ChatService) {
this.chatForm = this.fb.group({
  question: [''],
});
  }

  sendMessage(): void {
        const question = this.chatForm.value.question?.trim();
    if (!question) return;
    this.messages.push({type:'question',message:question})
    if(!this.conversationId){
      this.chatService.generateConvId().subscribe({
        next:(response:any)=>{
          
           this.conversationId=response.conversation_id;
           this.sendQuestion(question);
        }
      })
    }
    else{
      this.sendQuestion(question);
    }
    
          this.chatForm.reset();
  }

  
  // sendMessage(): void {
  //   const question = this.chatForm.value.question?.trim();
  //   if (!question) return;

  //   // Add user message to chat
  //   this.messages.push({
  //     text: question,
  //     isUser: true,
  //     timestamp: new Date()
  //   });

  //   this.chatService.askQuestion(this.userId, this.conversationId, question)
  //     .subscribe({
  //       next: (res) => {
  //         const response = res?.answer || 'No response received.';
      
  //         this.messages.push({
  //           text: response,
  //           isUser: false,
  //           timestamp: new Date()
  //         });
  //         this.chatForm.reset();
  //       },
  //       error: (err) => {
  //         console.error('API Error:', err);
        
  //         this.messages.push({
  //           text: 'Something went wrong. Please try again later.',
  //           isUser: false,
  //           timestamp: new Date()
  //         });
  //       },
  //     });
  // }
  startNewChat(){
    
  }
  sendQuestion(question:any){
   

    this.chatService.askQuestion(this.userId, this.conversationId, question)
      .subscribe({
        next: (res) => {
          this.messages.push({type:'answer',message:res?.response})
        
        },
        error: (err) => {
          console.error('API Error:', err);
          this.response = 'Something went wrong. Please try again later.';
        },
      });
  }
}
