import React from "react";
import styles from "./FormInput.module.scss";

const FormInput: React.FC<{
  onChange: (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => void;
  label: string;
  name: string;
  type: string;
  value: string;
  required: boolean;
}> = ({ onChange, label, ...otherProps }) => (
  <div className={styles.group}>
    {otherProps.type !== "select" ? (
      <>
        <input
          className={styles["form-input"]}
          onChange={onChange}
          {...otherProps}
        />
        {label ? (
          <label
            className={`${styles["form-input-label"]} ${
              otherProps.value.length ? styles.shrink : ""
            }`}
          >
            {label}
          </label>
        ) : null}
      </>
    ) : (
      <>
        <select
          name={otherProps.name}
          className={styles["form-input"]}
          onChange={onChange}
          defaultValue=""
        >
          <option value=""></option>
          <option value="developer">Developer</option>
          <option value="engineer">Engineer</option>
          <option value="accountant">Accountant</option>
          <option value="star">Rock star</option>
        </select>
        {label ? (
          <div
            className={`${styles["form-input-label"]} ${
              otherProps.value?.length ? styles.shrink : ""
            } `}
          >
            {label}
          </div>
        ) : null}
      </>
    )}
  </div>
);

export default FormInput;
