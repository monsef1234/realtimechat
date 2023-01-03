import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./ChatSlice";

const store = configureStore({
  reducer: { chat: chatSlice.reducer },
});
export default store;
