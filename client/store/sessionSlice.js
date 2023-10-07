// sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null, // You can store user data or authentication state here
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;
