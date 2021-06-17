import styles from "./CustomButton.module.scss";

const CustomButton: React.FC<{
  type?: "submit";
  onClick?: () => void;
  disabled: boolean;
}> = ({ children, ...otherProps }) => (
  <button
    className={`${styles["custom-button"]} ${
      otherProps.disabled ? styles.disabled : ""
    } ${children === "Back" ? styles.red : ""}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
