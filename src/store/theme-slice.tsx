import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../model/slice-types";

const initialState: ThemeState = {
  darkMode: Boolean(localStorage.getItem("darkMode")) || false,
  navLink: "home",
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkmode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setNavLink: (state, action: PayloadAction<string>) => {
      state.navLink = action.payload;
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;

