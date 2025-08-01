import { InferType, number, object, string } from "yup";

export const SearchSchema = object({
  name: string().notRequired().nullable(),
  category: string().notRequired().nullable(),
  location: string().notRequired().nullable(),
  minSallery: number().notRequired().nullable(),
  maxSallery: number().notRequired().nullable(),
});

export type SearchType = InferType<typeof SearchSchema>;