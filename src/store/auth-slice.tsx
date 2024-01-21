import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../model/slice-types";

interface LoginPayload {
  id: number;
  username: string;
  email: string;
  access_token: string;
}

const initialState: AuthState = {
  id: 0,
  username: "",
  email: "",
  access_token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = true;
      state.access_token = action.payload.access_token;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.id = 0;
      state.access_token = "";
      state.username = "";
      state.email = "";
    },
    setEmail(state, action: PayloadAction<string>){
      state.email = action.payload;
    }
  }
});

export const { login, logout, setEmail } = authSlice.actions;
export default authSlice.reducer;
