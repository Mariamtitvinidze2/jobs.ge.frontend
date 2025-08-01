import { InferType } from "yup";
import * as yup from 'yup'

export const ApprovalSchema = yup.object({
    status : yup.string()
})

export type ApprovalType = InferType<typeof ApprovalSchema>