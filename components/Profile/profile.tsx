import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomButton from "../CustomButtton/CustomButton";
import { auth } from "../../utils/firebase.utils";

import ProfileImg from "./ProfileImg";
import styles from "./profile.module.scss";
const Profile: React.FC = () => {
  const { userPicture, email, displayName } = useSelector(
    (state: RootState) => state.login
  );

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <ProfileImg picture={userPicture} type="page" />
        <h3>{displayName?.toUpperCase()}</h3>
        <p style={{ marginBottom: "50px" }}>{email}</p>

        <CustomButton disabled={false} onClick={() => auth.signOut()}>
          Sign Out
        </CustomButton>
      </div>
    </div>
  );
};

export default Profile;
