import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["USER", "COMPANY"], "You must select 'User' or 'Company'"),
  description: yup.string().when("role", {
    is: "COMPANY",
    then: (schema) =>
      schema
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    otherwise: (schema) => schema.optional(),
  }),
});

export type SignUpType = yup.InferType<typeof SignUpSchema>;