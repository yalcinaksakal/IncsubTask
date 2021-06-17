import React, { useState } from "react";

import { auth } from "../../utils/firebase.utils";
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

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setAuthData(prev => ({ ...prev, [name]: value }));
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
      <div className={styles.container}>
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
          <CustomButton type="submit" disabled={false}>
            Sign In
          </CustomButton>
        </form>
        <p style={{ color: "red" }}>{err}</p>
      </div>
    </div>
  );
};

export default SignIn;
