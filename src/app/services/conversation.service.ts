import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  // constructor(private http: HttpClient) {}
  // private apiUrl = 'https://dev.mohawkmedbuy.ai/';
  // getConversations(userId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}conversation/${userId}`);
  // }
}
