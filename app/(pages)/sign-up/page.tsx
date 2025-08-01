"use client";
import { axiosInstance } from "@/app/lib/axios-instance";
import { SignUpSchema, SignUpType } from "../../validations/SignUp-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { setCookie } from "cookies-next";

export default function SignUp() {
  const router = useRouter();
  const [isCompany, setIsCompany] = useState<Boolean>(false);
  const [role, setRole] = useState<"USER" | "COMPANY">("USER");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const onRoleChange = (newRole: "USER" | "COMPANY") => {
    setRole(newRole);
    setValue("role", newRole, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async ({
    fullName,
    email,
    password,
    confirmPassword,
    role,
    description,
  }: SignUpType) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const resp = await axiosInstance.post("/auth/sign-up", {
        fullName,
        email,
        password,
        confirmPassword,
        role,
        description,
      });
      if (resp.status === 201) {
        setCookie("role", role);
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(
            error.response.data.message || "Signup failed. Please try again."
          );
        } else if (error.request) {
          setErrorMessage(
            "Unable to connect to the server. Please check if the backend is running."
          );
        } else {
          setErrorMessage(error.message || "An unexpected error occurred.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col gap-[10px] items-center justify-center bg-gradient-to-r from-[#abdbf5] via-[#e7d8f0] to-[#76ffe6] px-4">
      <Image src={logo} alt="" width={140} height={140} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl ml-[-164px] font-bold text-center text-[#3f3ad4] mb-6 max-[450px] text-[22px]">
          ანგარიშის შექმნა
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onRoleChange("USER")}
                className={`flex-1 py-3 rounded-lg font-semibold transition
                  ${
                    role === "USER"
                      ? "bg-[#6c4edb] text-white scale-105 shadow-lg"
                      : "bg-white text-[#6c4edb] border border-[#6c4edb] hover:bg-[#6c4edb] hover:text-white"
                  }`}
                style={{ transformOrigin: "center" }}
              >
                მომხმარებელი
              </button>

              <button
                type="button"
                onClick={() => onRoleChange("COMPANY")}
                className={`flex-1 py-3 rounded-lg font-semibold transition
                  ${
                    role === "COMPANY"
                      ? "bg-[#6c4edb] text-white scale-105 shadow-lg"
                      : "bg-white text-[#6c4edb] border border-[#6c4edb] hover:bg-[#6c4edb] hover:text-white"
                  }`}
                style={{ transformOrigin: "center" }}
              >
                კომპანია
              </button>
            </div>
            {errors.role && (
              <p className="text-red-500 text-[14px] mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              სრული სახელი
            </label>
            <input
              {...register("fullName")}
              type="text"
              name="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
              placeholder="სახელი"
            />
            {errors.fullName && (
              <p className="text-red-500 text-[14px]">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ელ-ფოსტა
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
              placeholder="ემაილი"
            />
            {errors.email && (
              <p className="text-red-500 text-[14px]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              პაროლი
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              გაიმეორე პაროლი
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
              placeholder="პაროლის გამეორება"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[14px]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {role === "COMPANY" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                აღწერა
              </label>
              <textarea
                {...register("description")}
                name="description"
                id="description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9] resize-none"
                placeholder="მიუთითე შენი კომპანიის შესახებ ან სხვა დამატებითი ინფორმაცია..."
              />
              {errors.description && (
                <p className="text-red-500 text-[14px]">
                  {errors.description.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-[#3f3ad4] text-white font-semibold rounded-lg hover:bg-[#8f44a4] transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating..." : "შექმენი ანგარიში"}
          </button>
        </form>
      </div>
      <div className="flex ml-2 gap-[26px] mt-3">
        <p>გაქვთ ანგარიში? </p>
        <Link href="/sign-in" className="text-[#3f3ad4] hover:underline">
          შესვლა
        </Link>
      </div>
    </div>
  );
}
