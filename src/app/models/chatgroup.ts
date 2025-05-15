import { Conversation } from "./conversation";

export interface ChatGroup {
  title: string;
  conversations: Conversation[];
}
