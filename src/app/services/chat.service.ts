import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://dev.mohawkmedbuy.ai/chat';

  constructor(private http: HttpClient) {}

  askQuestion(userId: string, conversationId: string, question: string): Observable<any> {
    const payload = {
      user_id: userId,
      conversation_id: conversationId,
      question: question,
    };
    return this.http.post(`${this.apiUrl}/ask`, payload); 
  }

  
}
