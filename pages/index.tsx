import { useSelector } from "react-redux";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Profile from "../components/Profile/profile";
import { RootState } from "../store";
import Spinner from "../components/Spinner/Spinner";
import styles from "./Auth.module.scss";
import Header from "../components/Header/Header";
import { useState } from "react";
const AuthPage: React.FC = () => {
  const { isLoggedIn, isLoggingIn } = useSelector(
    (state: RootState) => state.login
  );
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <Header />
      {isLoggingIn ? (
        <Spinner />
      ) : isLoggedIn ? (
        <Profile />
      ) : (
        <div className={styles.auth}>
          {isSignIn ? (
            <SignIn clicked={() => setIsSignIn(false)} />
          ) : (
            <SignUp clicked={() => setIsSignIn(true)} />
          )}
        </div>
      )}
    </>
  );
};

export default AuthPage;
