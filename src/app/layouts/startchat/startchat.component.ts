import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { SqlModalComponent } from '../../shared/modals/sql-modal/sql-modal.component';
import { Router } from '@angular/router';
import { ChatMessage } from '../../models/chatmessage';

import { marked } from 'marked';

@Component({
  selector: 'app-startchat',
  standalone: true,
  imports: [
    MaterialModule,
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule,
    SqlModalComponent
  ],
  templateUrl: './startchat.component.html',
  styleUrl: './startchat.component.scss'
})
export class StartchatComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  chatForm: FormGroup;
  userId: string = 'DB69E171-1088-45AE-B619-339640A5FE1E'; // Replace with dynamic value if needed
  conversationId?: string;
  messages: ChatMessage[] = [];
  loading: boolean = false;


  constructor(private fb: FormBuilder, private chatService: ChatService,private router:Router) {
    this.chatForm = this.fb.group({
      question: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) { 
      console.error('Error scrolling to bottom:', err);
    }
  }

  sendMessage(): void {
    const question = this.chatForm.value.question?.trim();
    if (!question || this.loading) return;
    
    this.loading = true;
    
    this.messages.push({
      type: 'question',
      message: question,
      timestamp: new Date()
    });
    
    this.chatForm.reset();
    
    if (!this.conversationId) {
      this.chatService.generateConvId().subscribe({
        next: (response: any) => {
          this.conversationId = response.conversation_id;
          this.sendQuestionToService(question);
        },
        error: (err) => {
          console.error('Error generating conversation ID:', err);
          this.handleApiError();
        }
      });
    } else {
      this.sendQuestionToService(question);
    }
  }

  // private sendQuestionToService(question: string): void {
  //   if (!this.conversationId) {
  //     console.error('No conversation ID available');
  //     this.handleApiError();
  //     return;
  //   }
    
  //   this.chatService.askQuestion(this.userId, this.conversationId, question)
  //     .subscribe({
  //       next: (res: any) => {
  //         // Add bot response to chat
  //         this.messages.push({
  //           type: 'answer',
  //           message: res?.response || 'No response received.',
  //           timestamp: new Date()
  //         });
  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         console.error('API Error:', err);
  //         this.handleApiError();
  //       }
  //     });
  // }

  private handleApiError(): void {
    this.messages.push({
      type: 'answer',
      message: 'Something went wrong. Please try again later.',
      timestamp: new Date()
    });
    this.loading = false;
  }

  startNewChat(): void {
 this.router.navigate(['/chat'])
  }




  showSqlModal = false;
  currentSqlQuery: string | null = null;

  private sendQuestionToService(question: string): void {
    if (!this.conversationId) {
      this.handleApiError();
      return;
    }
    
    this.chatService.askQuestion(this.userId, this.conversationId, question)
      .subscribe({
        next: (res: any) => {
          const sqlQuery = this.extractSqlQuery(res);
          
          this.messages.push({
            type: 'answer',
            message: res?.response || 'No response received.',
            timestamp: new Date(),
            sqlQuery: sqlQuery // Can be null
          });
          
          this.loading = false;
        },
        error: (err) => this.handleApiError()
      });
  }

  private extractSqlQuery(response: any): string | null {
    // 1. Check for explicit SQL query
    if (response?.sqlQuery) {
      return response.sqlQuery;
    }
    
    // 2. Try to extract from response text
    if (typeof response?.response === 'string') {
      // Match SQL blocks (```sql ... ```)
      const sqlBlock = response.response.match(/```sql\s+([\s\S]*?)```/);
      if (sqlBlock && sqlBlock[1]) {
        return sqlBlock[1].trim();
      }
      
      // Match standalone SELECT statement
      const selectStatement = response.response.match(/SELECT[\s\S]*?(?:;|$)/i);
      if (selectStatement) {
        return selectStatement[0].trim();
      }
    }
    
    return null;
  }
isArray(value: any): boolean {
  return Array.isArray(value);
}

showSqlQueryFromArray(query: string) {
  this.currentSqlQuery = query;
  this.showSqlModal = true;
}

  showSqlQuery(message: ChatMessage): void {
    this.currentSqlQuery = message.sqlQuery || null;
    this.showSqlModal = true;
  }

  closeSqlModal(): void {
    this.showSqlModal = false;
  }

  onQueryCopied(): void {
    // Optional: Show a snackbar/toast notification
    console.log('SQL query was copied');
  }
  
}