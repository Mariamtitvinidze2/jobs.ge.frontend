import { CookieValueTypes } from "cookies-next";

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Company = {
  _id: string;
  fullName: string | FullName;
  email: string;
  description: string;
  role: "COMPANY" | "ADMIN" | "USER";
  avatar?: string;
  status: "pending" | "approved" | "rejected";
  vacansies: Vacancy[];
  updatedAt: string;
  createdAt: string;
  __v: number;
  profileImage?: string;
};

export type Vacancy = {
  _id: string;
  name: string;
  description: string;
  location: string;
  sallery: number;
  status: "pending" | "approved" | "rejected";
  company: Company;
  resumes: Resume[];
  createdAt: string;
  updatedAt: string;
  workplace?: "On-site" | "Remote" | "Optional";
  duration?: "Part-time" | "Full-time" | "Hybrid";
  __v: number;
};

export type User = {
  _id: string;
  fullName: string | FullName;
  email: string;
  role: "COMPANY" | "ADMIN" | "USER";
  avatar?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  applies: string[];
  __v: number;
  profileImage?: string;
};

export type Resume = {
  _id: string;
  user: {
    fullName: string | { firstName: string; lastName: string };
    email: string;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Token = {
  token: CookieValueTypes | Promise<CookieValueTypes>;
};