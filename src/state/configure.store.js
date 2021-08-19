import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from './root.reducer';
import {
  save_state_locally,
  get_local_state
} from "./middleware/localstorage.middleware";
import logger from "../middleware/logger.middleware";

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: get_local_state(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [...getDefaultMiddleware(), logger, save_state_locally]
});
export default store;