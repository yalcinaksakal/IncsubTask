import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  uid: "",
  email: "",
  displayName: "",
  userPicture: "",
  isLoggingIn: false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { email, displayName, picture, uid } = action.payload;
      state.isLoggedIn = true;
      state.displayName = displayName;
      state.email = email;
      state.userPicture = picture;
      state.uid = uid;
      state.isLoggingIn = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.displayName = "";
      state.email = "";
      state.userPicture = "";
      state.uid = "";
      state.isLoggingIn = false;
    },
    setLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
