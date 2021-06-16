import styles from "./FormInput.module.scss";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

const FormInput: React.FC<{
  onChange: (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => void;
  label: string;
  name: string;
  type: string;
  value: string;
  required: boolean;
}> = ({ onChange, label, ...otherProps }) => {
  const { touched, valid, err } = useSelector(
    (state: RootState) => state.signUp
  ).formFields[otherProps.name];

  return (
    <div className={styles.group}>
      {otherProps.type !== "select" ? (
        <>
          <input
            className={`${styles["form-input"]} ${
              touched && !valid ? styles.redBorder : ""
            }`}
            onChange={onChange}
            {...otherProps}
          />
          {label ? (
            <label
              className={`${styles["form-input-label"]} ${
                otherProps.value.length ? styles.shrink : ""
              } ${touched && !valid ? styles.redLabel : ""}`}
            >
              {label}
            </label>
          ) : null}
        </>
      ) : (
        <>
          <select
            className={`${styles["form-input"]} ${
              touched && !valid ? styles.redBorder : ""
            }`}
            onChange={onChange}
            {...otherProps}
          >
            <option disabled value=""></option>
            <option value="developer">Developer</option>
            <option value="engineer">Engineer</option>
            <option value="accountant">Accountant</option>
            <option value="star">Rock star</option>
          </select>
          {label ? (
            <div
              className={`${styles["form-input-label"]} ${
                otherProps.value?.length || touched ? styles.shrink : ""
              } ${touched && !valid ? styles.redLabel : ""}`}
            >
              {label}
            </div>
          ) : null}
        </>
      )}
      {otherProps.name === "pwd" ? (
        <p
          className={`${styles.warning} ${
            touched && !valid ? styles.redWarn : ""
          }`}
        >
          Minumum 8 characters
        </p>
      ) : (
        touched &&
        !valid && (
          <p
            className={`${styles.warning} ${
              touched && !valid ? styles.redWarn : ""
            }`}
          >
            {err}
          </p>
        )
      )}
    </div>
  );
};

export default FormInput;
