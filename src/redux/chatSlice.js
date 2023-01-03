import { createSlice } from "@reduxjs/toolkit";
import useAuth from "../custom-hooks/useAuth";

const initialState = {
  user: {},
  chatId: null,
  counter: 1,
};
const hookHandler = () => {
  const { currentUser } = useAuth();
  return currentUser;
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatSelect: (state, action) => {
      state.user = action.payload.userInfo;
      state.chatId =
        action.payload.id > action.payload.userInfo.uid
          ? action.payload.id + action.payload.userInfo.uid
          : action.payload.userInfo.uid + action.payload.id;
      state.counter++;
    },
  },
});
export const { chatSelect } = chatSlice.actions;

export default chatSlice;
