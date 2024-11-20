import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./home.store";

export const store = configureStore({
  reducer: {
    HomeStore: homeReducer,
  },
});
