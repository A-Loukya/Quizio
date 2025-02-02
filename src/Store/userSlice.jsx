import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
    removeUser: (state) => {
      state.users = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
