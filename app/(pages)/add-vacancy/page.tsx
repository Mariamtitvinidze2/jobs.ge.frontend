"use client";
import React, { useState } from "react";
import Header from "@/app/components/__organisms/header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@/app/lib/axios-instance";
import {
  AddVacancySchema,
  AddVacancyType,
} from "@/app/validations/AddVacancy-schema";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Image from "next/image";
import success from "../../assets/images/success_7518748.png";

const categories = [
  "IT and Programming",
  "Education",
  "Marketing",
  "Finance",
  "Medical Field",
  "Law",
  "Construction",
  "Accounting, Finance",
  "Auto Service",
  "Advertisement, Cashier, Consultant",
  "Education",
  "Sales, Marketing",
  "Insurance, Banking",
  "Cleaning",
  "Security, Safety",
  "Chef, Bartender",
  "Mechanics",
  "Construction",
  "Repair, Construction",
  "Office Work, Administration",
  "Hospitality, Tourism",
  "Construction Transport",
  "Sports, Entertainment",
  "Engineering",
  "Statistics",
  "Management",
  "Logistics, Operations",
  "Pharmacy, Healthcare",
  "Arts, Management",
  "Craftsman, Repair, Maintenance",
  "Singer, Assistant",
  "Underwater Firefighter",
];

export default function AddVacancy() {
  const token = getCookie("token");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWorkplace, setSelectedWorkplace] = useState("");
  const [workplaceOptionsVisible, setWorkplaceOptionsVisible] = useState(false);

  const [selectedDuration, setSelectedDuration] = useState("");
  const [durationOptionsVisible, setDurationOptionsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddVacancySchema),
  });

  const onSubmit = async (data: AddVacancyType) => {
    try {
      const resp = await axiosInstance.post(
        "/company/add-vacancy",
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (resp.status === 201) {
        setModal(true);
        setTimeout(() => {
          router.push("/");
          setModal(false);
        }, 3000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message || "An error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h1 className="text-center text-sm sm:text-base font-medium text-gray-800">
                Your vacancy has been successfully submitted and is awaiting
                approval
              </h1>
              <Image
                src={success}
                alt="success-icon"
                width={32}
                height={32}
                className="min-w-[32px]"
              />
            </div>
            <div className="w-4 h-4 mx-auto mt-3 border-2 border-t-transparent border-purple-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {categoryModal && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center px-4">
          <div className="bg-gray-200 rounded-2xl p-6 max-w-3xl w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  setValue("location", cat);
                  setCategoryModal(false);
                }}
                className="py-2 px-4 bg-gradient-to-r from-[#abdbf5] via-[#e7d8f0] to-[#d9aaf4] rounded-lg hover:bg-purple-200 text-sm text-gray-700"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-100 text-red-700 p-3 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}

      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-10 bg-white shadow-[0_0_100px_rgba(0,0,0,0.08)] rounded-[30px] space-y-6 mt-[130px] border border-gray-100"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Vacancy Title
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Vacancy Title"
          />
          {errors.name && (
            <p className="text-red-500 text-[14px]">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            {...register("sallery")}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.sallery && (
            <p className="text-red-500 text-[14px]">{errors.sallery.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <button
            type="button"
            onClick={() => setCategoryModal(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {selectedCategory || "Select Category"}
          </button>
          {errors.location && (
            <p className="text-red-500 text-[14px]">
              {errors.location.message}
            </p>
          )}
        </div>
        {/* Workplace */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Workplace
          </label>
          <button
            type="button"
            onClick={() => setWorkplaceOptionsVisible(!workplaceOptionsVisible)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {selectedWorkplace || "Select Workplace"}
          </button>
          {workplaceOptionsVisible && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {["On-site", "Remote", "Hybrid"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedWorkplace(option);
                    setValue("workplace", option);
                    setWorkplaceOptionsVisible(false);
                  }}
                  className="py-2 px-4 bg-gradient-to-r from-[#e7d8f0] to-[#d9aaf4] rounded-lg hover:bg-purple-200 text-sm text-gray-700"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {errors.workplace && (
            <p className="text-red-500 text-[14px]">
              {errors.workplace.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <button
            type="button"
            onClick={() => setDurationOptionsVisible(!durationOptionsVisible)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {selectedDuration || "Select Duration"}
          </button>
          {durationOptionsVisible && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {["Part-time", "Full-time", "Mixed"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedDuration(option);
                    setValue("duration", option);
                    setDurationOptionsVisible(false);
                  }}
                  className="py-2 px-4 bg-gradient-to-r from-[#e7d8f0] to-[#d9aaf4] rounded-lg hover:bg-purple-200 text-sm text-gray-700"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {errors.duration && (
            <p className="text-red-500 text-[14px]">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Vacancy Description..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-[14px]">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-[#4f2cdb] via-[#3b3eea] to-[#3a23ea] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
        >
          Add Vacancy
        </button>
      </form>
    </div>
  );
}
