import { useSelector } from "react-redux";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Profile from "../components/Profile/profile";
import { RootState } from "../store";
import Spinner from "../components/Spinner/Spinner";
import styles from "./Auth.module.scss";
import Header from "../components/Header/Header";
const AuthPage: React.FC = () => {
  const { isLoggedIn, isLoggingIn } = useSelector(
    (state: RootState) => state.login
  );

  return (
    <>
      <Header />
      {isLoggingIn ? (
        <Spinner />
      ) : isLoggedIn ? (
        <Profile />
      ) : (
        <div className={styles.auth}>
          {/* <SignIn /> */}
          <SignUp />
        </div>
      )}
    </>
  );
};

export default AuthPage;
