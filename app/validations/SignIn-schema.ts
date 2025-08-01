import { InferType, object, string } from "yup";
import * as yup from 'yup'


export const SignInSchema = yup.object({
    email : string().email().required(),
    password : string().min(8).max(20).required()
})

export type SignInType = InferType<typeof SignInSchema>