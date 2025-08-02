"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";
import { axiosInstance } from "@/app/lib/axios-instance";
import { useUploadStore } from "../../../zoostand/zoostand";
import Email from "../../../assets/images/email_3624711.png";
import Money from "../../../assets/images/money_5409901.png";
import Building from "../../../assets/images/office-building_4300059.png";
import { Vacancy } from "@/app/types/types";

export default function VacancyModal({
  vacancy,
  onClose,
}: {
  vacancy: Vacancy;
  onClose: () => void;
}) {
  const [resumeModal, setResumeModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const token = getCookie("token");
  const setFile = useUploadStore((state) => state.setFile);
  const file = useUploadStore((state) => state.file);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files[0].name.split(".")[1] !== "pdf") {
      setErrorMessage("ფაილი აუცილებლად უნდა იყოს PDF");
      return;
    }

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setErrorMessage("აირჩიე PDF ფაილი");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await axiosInstance.post(
        `/vacancies/${vacancy._id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (resp.status === 201) {
        alert("რეზიუმე გაგზავნილია");
        setResumeModal(false);
        onClose();
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ||
            "ფაილის ატვირთვა ვერ მოხერხდა. სცადე თავიდან."
        );
      } else {
        setErrorMessage("დაფიქსირდა შეცდომა. სცადე თავიდან.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white max-w-[700px] w-full p-6 rounded-2xl relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h1 className="text-xl font-bold text-gray-800">{vacancy.name}</h1>

        <div className="flex items-center mt-2">
          <h2 className="text-sm">
            {typeof vacancy.company.fullName === "string"
              ? vacancy.company.fullName
              : `${vacancy.company.fullName?.firstName ?? ""} ${
                  vacancy.company.fullName?.lastName ?? ""
                }`}
          </h2>
          <span className="w-1 h-1 bg-gray-300 rounded-full inline-block mx-2" />
          <h2 className="text-sm">{vacancy.location}</h2>
        </div>

        <div className="mt-3">
          <p className="flex gap-2 text-[13px] mt-2">
            <Image
              src="https://myjobs.ge/images/people.svg"
              alt="people"
              width={20}
              height={20}
            />
            {typeof vacancy.company.fullName === "string"
              ? vacancy.company.fullName
              : `${vacancy.company.fullName?.firstName ?? ""} ${
                  vacancy.company.fullName?.lastName ?? ""
                }`}
          </p>

          <p className="flex gap-2 text-[13px] mt-2">
            <Image src={Email} alt="email" width={20} height={20} />
            {vacancy.company.email}
          </p>
        </div>

        <div className="mt-6">
          <h1 className="text-[16px] font-semibold mb-2">ვაკანსიის აღწერა</h1>
          <p className="text-gray-500 text-[14px]">{vacancy.description}</p>
        </div>

        <div className="mt-6 flex gap-4 items-center">
          {vacancy.company.avatar && (
            <Image
              src={vacancy.company.avatar}
              alt="avatar"
              width={60}
              height={60}
              className="rounded-full object-cover border"
            />
          )}
          <div>
            <h1 className="text-[16px] font-semibold flex gap-2 items-center">
              {typeof vacancy.company.fullName === "string"
                ? vacancy.company.fullName
                : `${vacancy.company.fullName?.firstName ?? ""} ${
                    vacancy.company.fullName?.lastName ?? ""
                  }`}
              <Image src={Building} alt="building" width={18} height={18} />
            </h1>
            <p className="text-[12px]">{vacancy.location}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setResumeModal(true)}
            className="bg-violet-600 text-white px-6 py-2 rounded-xl hover:bg-violet-700 transition"
          >
            რეზიუმეს გაგზავნა
          </button>
        </div>

        {resumeModal && (
          <div className="fixed inset-0 bg-[#9e9b9bad] bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative space-y-5 text-center">
              <button
                onClick={() => setResumeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>

              <h2 className="text-xl font-semibold">რეზიუმეს ატვირთვა</h2>
              <p className="text-sm text-gray-500">ატვირთე რეზიუმე</p>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <div className="flex flex-col items-center space-y-4">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  id="resume-upload"
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer bg-violet-100 text-[#3f3ad4] font-semibold px-4 py-2 rounded-lg hover:bg-violet-200 transition"
                >
                  ფაილის არჩევა
                </label>
                {file && (
                  <p className="text-black text-sm">
                    რეზიუმის არჩევა წარმატებით შესრულდა
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#3f3ad4] text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition"
              >
                გაგზავნა
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
