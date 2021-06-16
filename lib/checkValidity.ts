const checker: (
  name: string,
  value: string
) => { valid: boolean; err: string } = (name, value) => {
  let valid = true;
  const length = value.trim().length;
  if (!length) valid = false;
  if (valid && name === "email" && !value.includes("@")) valid = false;

  if (valid && name === "pwd" && length < 8) valid = false;
  let err = "";
  if (!valid)
    switch (name) {
      case "displayName":
        err = "Please enter a valid name";
        break;
      case "email":
        err = "Please enter a valid email address";
        break;
      case "userType":
        err = "Please choose a user type";
        break;
      case "pwd":
        err = "Minumum 8 characters";
        break;
      default:
        break;
    }

  return { valid, err };
};

export default checker;
