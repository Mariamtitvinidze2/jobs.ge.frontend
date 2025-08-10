"use client";

import { axiosInstance } from "@/app/lib/axios-instance";
import { useGetCurrentUserOrCompany } from "@/app/lib/getCurrentUserOrCompany";
import { SignInSchema, SignInType } from "@/app/validations/SignIn-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/images/logo.png";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async ({ email, password }: SignInType) => {
    setLoading(true);
    try {
      const resp = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      if (resp.status === 201) {
        setCookie("token", resp.data.token, { maxAge: 60 * 120 });
        const role = await getCurrentUserOrCompany(resp.data);
        if (role === "ADMIN") {
          router.push("/admin");
          return;
        }

        router.push("/");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-[20px] justify-center bg-gradient-to-r from-[#abdbf5] via-[#e7d8f0] to-[#76ffe6] px-4">
      <Image src={logo} alt="logo" width={140} height={140} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-[#3f3ad4] mb-6 max-[450px] ml-[-277px] text-[22px]">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
              placeholder="email"
            />
            {errors.email && (
              <p className="text-red-500 text-[14px]">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                placeholder="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-[14px]">
                {errors.password.message}
              </p>
            )}
            {error && (
              <h1 className="text-red-500 text-[14px] mt-1">
                Incorrect credentials
              </h1>
            )}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-[#3f3ad4] text-white font-semibold rounded-lg hover:bg-[#8f44a4] transition duration-300"
          >
            Sign In
          </button>
          {loading && <h1>...loading</h1>}
        </form>

        <div className="flex gap-2 mt-4">
          <Link href="/sign-up" className="text-[#3f3ad4] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
