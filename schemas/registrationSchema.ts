import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  companyId: yup.string().required("Company ID is required"),
  companyName: yup.string().required("Company name is required"),
  registrationType: yup.string().required("Registration type is required"),
  gender: yup.string().required("Gender is required"),
  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: yup
    .string()
    .required("Email address is required")
    .email("Enter a valid email address"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
