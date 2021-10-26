import Regex from "./Regex";
const FormValidation = {
  validateForm: (form, formErrors, validateFunc) => {
    const errorObj = {};
    Object.keys(formErrors).map((x) => {
      let refValue = null;
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  },
  resetPass: (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is Required";
        else if (!Regex.EMAIL_REGEXP.test(value)) return "Enter a valid email address";
        else return "";
      default:
        return "";
    }
  },
  loginForm: (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is Required";
        else if (!Regex.EMAIL_REGEXP.test(value)) return "Enter a valid email address";
        else return "";
      case "password":
        if (!value) return "Password is Required";
        else return "";
      default:
        return "";
    }
  },
  registerForm: (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is Required";
        else if (!Regex.EMAIL_REGEXP.test(value)) return "Enter a valid email address";
        else return "";
      case "password":
        if (!value) return "Password is Required";
        else if (!Regex.PASSWORD_REGEX.test(value))
          return "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and NO SPECIAL CHARACTERS ";
        else return "";

      case "name":
        if (!value) return "name is Required";
        else if (!Regex.FULL_NAME_REGEX.test(value)) return "Enter a valid name ";
        else return "";
      case "contact":
        if (!value) return "phone is Required";
        else if (!Regex.MOBILE_REGEX.test(value)) return "Please enter a valid phone number";
        else return "";
      case "address":
        if (!value) return "address is Required";
        else return "";
      default:
        return "";
    }
  },
  changePasswordForm: (name, value) => {
    switch (name) {
      case "newPass":
        if (!value) return "Password is Required";
        else if (!Regex.PASSWORD_REGEX.test(value))
          return "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and NO SPECIAL CHARACTERS ";
        else return "";
      case "confirmPass":
        if (!value) return "Password is Required";
        else if (!Regex.PASSWORD_REGEX.test(value))
          return "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and NO SPECIAL CHARACTERS ";
        else return "";
      default:
        return "";
    }
  },

  updateProfile: (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is Required";
        else if (!Regex.EMAIL_REGEXP.test(value)) return "Enter a valid email address";
        else return "";
      case "phone":
        if (!value) return "phone is Required";
        else if (!Regex.MOBILE_REGEX.test(value)) return "Please enter a valid phone number";
        else return "";
      case "name":
        if (!value) return "name is Required";
        else return "";
      default:
        return "";
    }
  },

  addProduct: (name, value) => {
    switch (name) {
      case "category":
        if (!value) return "Category is Required";
        else return "";
      case "title":
        if (!value) return "Title is Required";
        else return "";
      case "description":
        if (!value) return "Description is Required";
        else return "";
      case "address":
        if (!value) return "Address is Required";
        else return "";
      // case "photo[]":
      //   if (!value) return "Photo is Required";
      //   else return "";
      case "phone":
        if (!value) return "Phone is Required";
        else if (!Regex.MOBILE_REGEX.test(value)) return "Please enter a valid phone number";
        else return "";
      case "email":
        if (!value) return "Email is Required";
        else if (!Regex.EMAIL_REGEXP.test(value)) return "Enter a valid email address";
        else return "";
      default:
        return "";
    }
  },
};
export default FormValidation;
