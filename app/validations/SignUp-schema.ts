import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  fullName: yup.string().required("სრული სახელი სავალდებულოა").min(2, "სრული სახელი უნდა იყოს მინიმუმ 2 სიმბოლო"),
  email: yup.string().email("არასწორი ელ-ფოსტის ფორმატი").required("ელ-ფოსტა სავალდებულოა"),
  password: yup.string().required("პაროლი სავალდებულოა").min(8, "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო"),
  confirmPassword: yup
    .string()
    .required("პაროლის გამეორება სავალდებულოა")
    .oneOf([yup.ref("password")], "პაროლები უნდა ემთხვეოდეს"),
  role: yup.string().required("როლი სავალდებულოა").oneOf(["USER", "COMPANY"], "უნდა აირჩიოთ 'მომხმარებელი' ან 'კომპანია'"),
  description: yup.string().when("role", {
    is: "COMPANY",
    then: (schema) => schema.required("აღწერა სავალდებულოა").min(10, "აღწერა უნდა იყოს მინიმუმ 10 სიმბოლო"),
    otherwise: (schema) => schema.optional(),
  }),
});

export type SignUpType = yup.InferType<typeof SignUpSchema>;