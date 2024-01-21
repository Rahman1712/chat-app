
export interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  mobile: string;
}

export interface ChatItem {
  id: number;
  roomId: string;
  messages: Message[] | null;
  users: User[];
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  contentType: string;
  timestamp: string;
}
