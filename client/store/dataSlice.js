// sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "data",
  initialState: {
    data: null, // You can store user data or authentication state here
  },
  reducers: {
    setData: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    clearData: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;
