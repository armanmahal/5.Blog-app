import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserImage: (state, action) => {
      state.currentUser.image = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, updateUserImage, deleteUser } = userSlice.actions;

export default userSlice.reducer;
