export interface ChatMessage {
  type: 'question' | 'answer';
  message: string;
  timestamp?: Date;
  sqlQuery?: string | null; // Make nullable
}