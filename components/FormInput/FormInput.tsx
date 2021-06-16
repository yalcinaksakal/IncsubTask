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
}> = ({ onChange, label, ...otherProps }) => {
  return (
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
          {otherProps.name === "pwd" && (
            <p className={styles.warning}>Minumum 8 characters</p>
          )}
        </>
      ) : (
        <>
          <select
            className={styles["form-input"]}
            onChange={onChange}
            {...otherProps}
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
};

export default FormInput;
