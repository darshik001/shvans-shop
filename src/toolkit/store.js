import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/index.slice";

rootReducer

export const store = configureStore({
  reducer: rootReducer

});