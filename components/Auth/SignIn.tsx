import React, { useState } from "react";

import { auth, authProvider } from "../../utils/firebase.utils";
import CustomButton from "../CustomButtton/CustomButton";
import FormInput from "../FormInput/FormInput";
import styles from "./SignIn.module.scss";

import Spinner from "../Spinner/Spinner2";
const SignIn: React.FC = () => {
  const [authData, setAuthData] = useState({ email: "", pwd: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(authData.email, authData.pwd);
      setAuthData({ email: "", pwd: "" });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErr("Invalid email or password");
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    setErr("");
    setIsLoading(true);
    // dispatch(loginActions.setLoggingIn(true));
    authProvider.setCustomParameters({ prompt: "select_account" });
    try {
      // await auth.signInWithPopup(authProvider);
      await auth.signInWithRedirect(authProvider);
    } catch (err) {
      setErr(err.message);
      setIsLoading(false);
    }
    // setIsLoading(false);
    // dispatch(loginActions.setLoggingIn(false));
  };
  return isLoading ? (
    <div
      style={{
        width: "30vw",
        minWidth: "180px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <div className={styles["sign-in"]}>
      <h1 className={styles.title}>I already have an account</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          name="email"
          type="email"
          value={authData.email}
          label="Email"
          required
        />
        <FormInput
          onChange={handleChange}
          name="pwd"
          type="password"
          value={authData.pwd}
          label="Password"
          required
        />
        <CustomButton type="submit">Sign In</CustomButton>
        <CustomButton type="button" onClick={handleGoogleSignIn} isGoogleSignIn>
          Google Sign in
        </CustomButton>
      </form>
      <p style={{ color: "red" }}>{err}</p>
    </div>
  );
};

export default SignIn;
