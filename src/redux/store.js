import { configureStore } from "@reduxjs/toolkit";
import betValueReducer from "./feature/bet/betSlice";

export const store = configureStore({
  reducer: {
    betValue: betValueReducer,
  },
});
