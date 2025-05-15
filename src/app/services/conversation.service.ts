import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Conversation {
  conversation_id: string;
  conversation_title: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private baseUrl = 'https://dev.mohawkmedbuy.ai/conversation';

  constructor(private http: HttpClient) { }

  getAllConversations(userId: string): Observable<{conversations: Conversation[]}> {
    return this.http.get<{conversations: Conversation[]}>(`${this.baseUrl}/${userId}`);
  }

  deleteConversation(conversationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${conversationId}`);
  }
}
