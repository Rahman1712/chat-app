import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatState } from "../model/slice-types";
import { ChatItem } from "../model/chat-types";

const initialState: ChatState = {
  roomId: "",
  chatItem: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setChatItem: (state, action: PayloadAction<ChatItem>) => {
      state.chatItem = action.payload;
    },
    resetAll: (state) => {
      state.roomId = "";
      state.chatItem = null;
    },
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;

