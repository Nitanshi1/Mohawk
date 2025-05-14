import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from '../../shared/material/material.module';
import { NgFor, NgIf } from '@angular/common';
interface ChatMessage {
  text: string;
  date: Date;
  truncated?: boolean;
}

interface ChatGroup {
  title: string;
  messages: ChatMessage[];
}



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, NgFor,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  searchText = '';
  chatGroups: ChatGroup[] = [];
  sidebarOpen = true;

  constructor() { }

  ngOnInit(): void {
    // Sample data - you would replace this with your actual data
    this.chatGroups = [
      {
        title: 'TODAY',
        messages: [
          { text: 'Could you provide the total number...', date: new Date(), truncated: true },
          { text: 'Mention the vendors associated with...', date: new Date(), truncated: true },
          { text: 'Provide a list of customers who have per...', date: new Date(), truncated: true },
          { text: 'Here is the list of customers who have...', date: new Date(), truncated: true },
          { text: 'Hi I am Ryan', date: new Date() },
          { text: 'Are there any contracts set to expire wit...', date: new Date(), truncated: true },
          { text: 'Provide the Contract Number for the va...', date: new Date(), truncated: true },
          { text: 'Could you provide the Terms and Con...', date: new Date(), truncated: true }
        ]
      },
      {
        title: 'YESTERDAY',
        messages: [
          { text: 'Hi I am Ryan', date: new Date() },
          { text: 'Are there any contracts set to expire wit...', date: new Date(), truncated: true },
          { text: 'Here is the list of customers who have...', date: new Date(), truncated: true },
          { text: 'Mention the vendors associated with...', date: new Date(), truncated: true },
          { text: 'Could you provide the total number of re...', date: new Date(), truncated: true },
          { text: 'Provide a list of customers who have pas...', date: new Date(), truncated: true }
        ]
      },
      {
        title: 'LAST 30 DAYS',
        messages: [
          { text: 'Hi I am Ryan', date: new Date() },
          { text: 'Are there any contracts set to expire wit...', date: new Date(), truncated: true }
        ]
      }
    ];
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  search(): void {
    console.log('Searching for:', this.searchText);
  }

  deleteMessage(groupIndex: number, messageIndex: number): void {
    this.chatGroups[groupIndex].messages.splice(messageIndex, 1);
    if (this.chatGroups[groupIndex].messages.length === 0) {
      this.chatGroups.splice(groupIndex, 1);
    }
  }
}