import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomButton from "../CustomButtton/CustomButton";
import { auth } from "../../utils/firebase.utils";

import { useRouter } from "next/dist/client/router";
import ProfileImg from "./ProfileImg";

const Profile: React.FC = () => {
  const { userPicture, email, displayName } = useSelector(
    (state: RootState) => state.login
  );
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <ProfileImg picture={userPicture} type="page" />
      <h3>{displayName?.toUpperCase()}</h3>
      <p style={{ marginBottom: "50px" }}>{email}</p>
      <CustomButton onClick={() => router.push("/toys")} isGoogleSignIn>
        Shop now
      </CustomButton>
      <br />
      <CustomButton onClick={() => auth.signOut()}>Sign Out</CustomButton>
    </div>
  );
};

export default Profile;
