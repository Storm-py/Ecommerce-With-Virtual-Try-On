import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStatusTrue: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; 
    },
    userStatusFalse: (state) => {
      state.isLoggedIn = false;
      state.user = null; 
    },
  },
});

export default userSlice.reducer;
export const { userStatusFalse, userStatusTrue } = userSlice.actions;
