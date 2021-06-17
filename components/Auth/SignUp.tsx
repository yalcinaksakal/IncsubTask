import FormInput from "../FormInput/FormInput";
import styles from "./SignUp.module.scss";
import CustomButton from "../CustomButtton/CustomButton";
import { auth, createUserProfileDocument } from "../../utils/firebase.utils";
import React, { useState } from "react";
import Spinner from "../Spinner/Spinner2";
import checkValidity from "../../lib/checkValidity";
import { useDispatch, useSelector } from "react-redux";
import { signUpActions } from "../../store/sign-up-slice";
import { RootState } from "../../store";
const SignUp: React.FC<{ clicked: () => void }> = ({ clicked }) => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const { isFormValid } = useSelector((state: RootState) => state.signUp);

  const [credentials, setCredentials] = useState<{ [key: string]: string }>({
    displayName: "",
    email: "",
    pwd: "",
    confirmPwd: "",
    userType: "",
  });
  const [formErr, setFormErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { displayName, email, pwd, confirmPwd } = credentials;

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setCredentials(prev => ({ ...prev, [name]: value }));

    if (name !== "confirmPwd") {
      const validityResult = checkValidity(name, value);
      dispatch(
        signUpActions.setField({ name, touched: true, ...validityResult })
      );
    } else {
      dispatch(
        signUpActions.setField({
          name,
          touched: true,
          valid: value === pwd,
          err:
            value === pwd
              ? ""
              : "Password and Confirm Password have to be same",
        })
      );
    }
  };
  const handleSignUp = async () => {
    setFormErr("");
    setStep(0);
    setIsLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, pwd);
      await createUserProfileDocument(user, { displayName });
    } catch (err) {
      setFormErr(err.message);
      setIsLoading(false);
    }
  };
  const handleSteps = () => {
    setStep(prevState => prevState + 1);
  };
  return isLoading ? (
    <div
      style={{
        width: "50vw",
        marginLeft: "30px",
        maxWidth: "500px",
        height: "550px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <div className={styles["sign-up"]}>
      <div className={styles.container}>
        <h1 className={styles.title}>Let's set up your account</h1>

        <span>Already have an account?</span>
        <span className={styles.signIn} onClick={clicked}>
          Sign in
        </span>
        {step === 0 ? (
          <>
            <form>
              {[
                { type: "text", name: "displayName", label: "Your Name" },
                { type: "text", name: "email", label: "Email Address" },
                {
                  type: "select",
                  name: "userType",
                  label: "I would describe my user type as",
                },
                { type: "password", name: "pwd", label: "Password" },
                {
                  type: "password",
                  name: "confirmPwd",
                  label: "Confirm Password",
                },
              ].map((item, index) => (
                <FormInput
                  key={index}
                  type={item.type}
                  name={item.name}
                  value={credentials[item.name]}
                  onChange={handleChange}
                  label={item.label}
                  required={false}
                ></FormInput>
              ))}
              <CustomButton disabled={!isFormValid} onClick={handleSteps}>
                Next
              </CustomButton>
            </form>
            <p style={{ color: "red" }}>{formErr}</p>
          </>
        ) : (
          <>
            <h2 style={{ margin: "60px 0" }}>
              {step === 1
                ? "Some process in this step..."
                : "And finally, last step..."}
            </h2>
            <CustomButton
              disabled={false}
              onClick={step === 1 ? handleSteps : handleSignUp}
            >
              {step === 1 ? "Next" : "Sign Up"}
            </CustomButton>
            <CustomButton
              disabled={false}
              onClick={() => setStep(prevState => prevState - 1)}
            >
              Back
            </CustomButton>
          </>
        )}
      </div>
      <div className={styles.steps}>
        <span>{`Step ${step + 1} of 3`}</span>
        {[0, 1, 2].map(index => (
          <div
            key={index}
            className={`${styles.step} ${
              step === index ? styles.activeStep : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SignUp;
