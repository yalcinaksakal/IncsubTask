import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: { touched: false, valid: false, err: "" },
  displayName: { touched: false, valid: false, err: "" },
  userType: { touched: false, valid: false, err: "" },
  pwd: { touched: false, valid: false, err: "" },
  password: { touched: false, valid: false, err: "" },
  isFormValid: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setField(state, action) {
      console.log(action.payload);
    },
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
