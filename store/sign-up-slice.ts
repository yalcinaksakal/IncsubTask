import { createSlice } from "@reduxjs/toolkit";

// const initialState: {
//     items: { [key: string]: CartItem };
//     numberOfItems: number;
//     total: number;
//     hidden: boolean;
//   }

const initialState: {
  formFields: {
    [key: string]: { touched: boolean; valid: boolean; err: string };
  };
  isFormValid: boolean;
} = {
  formFields: {
    email: { touched: false, valid: false, err: "" },
    displayName: { touched: false, valid: false, err: "" },
    userType: { touched: false, valid: false, err: "" },
    pwd: { touched: false, valid: false, err: "" },

    confirmPwd: { touched: false, valid: false, err: "" },
  },
  isFormValid: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setField(state, action) {
      const { err, name, touched, valid } = action.payload;
      state.formFields[name] = { touched, valid, err };

      if (!valid) {
        state.isFormValid = false;
      } else {
        state.isFormValid = !Object.keys(state.formFields).find(
          key => key !== name && !state.formFields[key].valid
        );

        if (
          !Object.keys(state.formFields).find(
            key =>
              key !== "userType" && key !== name && !state.formFields[key].valid
          ) &&
          !state.formFields["userType"].touched
        )
          state.formFields["userType"] = {
            touched: true,
            valid: false,
            err: "Please choose a user type",
          };
      }
    },
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
