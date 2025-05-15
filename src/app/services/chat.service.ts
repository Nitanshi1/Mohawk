import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://dev.mohawkmedbuy.ai';

  constructor(private http: HttpClient) {}

  askQuestion(userId: string, conversationId: string, question: string): Observable<any> {
    const payload = {
      user_id: userId,
      conversation_id: conversationId,
      question: question,
    };
    return this.http.post(`${this.apiUrl}/chat/ask`, payload); 
  }
  generateConvId():Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/conversation/new-chat`,{})
  }
  
}
