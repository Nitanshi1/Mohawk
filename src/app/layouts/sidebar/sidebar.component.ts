import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { NgFor, NgIf } from '@angular/common';
import { Conversation, ConversationService } from '../../services/conversation.service';

interface ChatGroup {
  title: string;
  conversations: Conversation[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  chatGroups: ChatGroup[] = [];
  sidebarOpen = true;
  isLoading = true;
  error = '';
  userId = 'DB69E171-1088-45AE-B619-339640A5FE1E';

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.fetchConversations();
  }

  fetchConversations(): void {
    this.conversationService.getAllConversations(this.userId)
      .subscribe({
        next: (response:any) => {
          this.organizeConversations(response.conversations);
          this.isLoading = false;
        },
        error: (err:any) => {
          this.error = 'Failed to load conversations';
          this.isLoading = false;
          console.error('Error fetching conversations:', err);
        }
      });
  }

  organizeConversations(conversations: Conversation[]): void {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    const todayConversations: Conversation[] = [];
    const yesterdayConversations: Conversation[] = [];
    const olderConversations: Conversation[] = [];

    conversations.forEach(conv => {
      const updatedDate = new Date(conv.updated_at);
      
      if (updatedDate >= today) {
        todayConversations.push(conv);
      } else if (updatedDate >= yesterday) {
        yesterdayConversations.push(conv);
      } else if (updatedDate >= last30Days) {
        olderConversations.push(conv);
      }
    });

    this.chatGroups = [
      { title: 'TODAY', conversations: todayConversations },
      { title: 'YESTERDAY', conversations: yesterdayConversations },
      { title: 'LAST 30 DAYS', conversations: olderConversations }
    ].filter(group => group.conversations.length > 0);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  deleteConversation(groupIndex: number, conversationIndex: number): void {
    const conversation = this.chatGroups[groupIndex].conversations[conversationIndex];
    
    this.conversationService.deleteConversation(conversation.conversation_id)
      .subscribe({
        next: () => {
          this.chatGroups[groupIndex].conversations.splice(conversationIndex, 1);
          if (this.chatGroups[groupIndex].conversations.length === 0) {
            this.chatGroups.splice(groupIndex, 1);
          }
        },
        error: (err:any )=> {
          console.error('Error deleting conversation:', err);
        }
      });
  }
}