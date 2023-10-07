// sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // You can store user data or authentication state here
  },
  reducers: {
    setRollno: (state, action) => {
      state.user = action.payload;
    },
    clearRollno: (state) => {
      state.user = null;
    },
  },
});

export const { setRollno, clearRollno } = sessionSlice.actions;
export default sessionSlice.reducer;
