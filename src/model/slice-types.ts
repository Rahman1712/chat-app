import { ChatItem } from "./chat-types";


export interface AuthState {
  id: number;
  username: string;
  email: string;
  access_token: string ;
  isLoggedIn: boolean;
}


export interface ChatState {
  roomId: string;
  chatItem: ChatItem | null;
}


export interface ThemeState {
  darkMode: boolean;
  navLink: string;
}