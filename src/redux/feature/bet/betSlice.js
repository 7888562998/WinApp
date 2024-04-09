import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  balance: 100,
};

export const betSlice = createSlice({
  name: "betValue",
  initialState,
  reducers: {
    setInitialbalance: (state, action) => {
      const balance = action.payload;
      state.balance = state.balance + balance;
    },
    setBetValue: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      state.value.push(data.betValue);
      state.balance = state.balance - data.betAmount;
    },
    setBetEmpty: (state) => {
      state.value = [];
    },
    winBet: (state, action) => {
      const winingAmount = action.payload * 5;
      state.balance = state.balance + winingAmount;
    },
    winColorBet: (state, action) => {
      const winingAmount = action.payload * 2;
      console.log("wining Amount", winingAmount, "a", action.payload);
      state.balance = state.balance + winingAmount;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBetValue,
  setBetEmpty,
  winBet,
  winColorBet,
  setInitialbalance,
} = betSlice.actions;

export default betSlice.reducer;
