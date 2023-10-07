// store.js
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    data: dataReducer,
  },
});

export default store;
