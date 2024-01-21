import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./auth-slice";
import { combineReducers } from "redux"; 
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import chatSlice from "./chat-slice";
import themeSlice from "./theme-slice";

const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
  theme: themeSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
  stateReconciler: autoMergeLevel2, 
  blacklist: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    })
});


export const persistor = persistStore(store);
export default store;
