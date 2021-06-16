import { profile } from "../../assets/svgs";
import styles from "./ProfileImg.module.scss";
import { useEffect, useState } from "react";

const ProfileImg: React.FC<{ picture: string; type: "page" | "nav" }> = ({
  picture,
  type,
}) => {
  const [profileImgSrc, setProfileImgSrc] = useState("");

  useEffect(() => {
    const handleLoad = () => setProfileImgSrc(picture);
    const image = new Image();
    image.src = picture;
    image.addEventListener("load", handleLoad);
    return () => image.removeEventListener("load", handleLoad);
  }, [setProfileImgSrc, picture]);

  return (
    <div className={styles.container}>
      {picture && picture === profileImgSrc ? (
        <img
          src={picture}
          style={{
            width: type === "nav" ? "30px" : "100px",
            borderRadius: "50%",
            margin: "15px 0",
          }}
        />
      ) : (
        <svg
          style={{
            marginTop: type === "nav" ? "0" : "30px",
            transform: "translateY(2px)",
          }}
          width={type === "nav" ? "25" : "80"}
          height={type === "nav" ? "25" : "80"}
          viewBox="0 0 22 22"
          fill={type === "nav" ? "black" : "dodgerblue"}
        >
          <path d={profile} />
        </svg>
      )}
    </div>
  );
};

export default ProfileImg;
