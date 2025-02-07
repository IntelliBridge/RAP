import * as yup from "yup";

// TODO: need to update SignUp schema
export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .default("")
    .email("Invalid email")
    .required("Email is required!"),
  password: yup.string().default("").required("Password is required!"),
});
