import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation';



@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private baseUrl = 'https://dev.mohawkmedbuy.ai/conversation/';

  constructor(private http: HttpClient) { }

  getAllConversations(userId: string): Observable<{conversations: Conversation[]}> {
    return this.http.get<{conversations: Conversation[]}>(`${this.baseUrl}${userId}`);
  }

deleteConversation(userId: string, conversationId: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}`, {
    params: {
      user_id: userId,
      conversation_id: conversationId
    }
  });
}

}
