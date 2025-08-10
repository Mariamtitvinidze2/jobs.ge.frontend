"use client";
import { axiosInstance } from "@/app/lib/axios-instance";
import { useUploadStore } from "../../../zoostand/zoostand";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { AxiosError } from "axios";

type Props = {
  vacancyId: string | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddResumeModal({ vacancyId, setModal }: Props) {
  const token = getCookie("token");
  const setFile = useUploadStore((state) => state.setFile);
  const file = useUploadStore((state) => state.file);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files[0].name.split(".")[1] !== "pdf") {
      setErrorMessage("The file must be a PDF");
      return;
    }

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setErrorMessage("Select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file);

    try {
      const resp = await axiosInstance.post(
        `/vacancies/${vacancyId}/apply`,
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
        alert("Resume sent successfully");
        setModal(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to upload the file. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#9e9b9bad] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative space-y-5 text-center">
        <button
          onClick={() => setModal(false)}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold">Upload Resume</h2>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

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
            className="cursor-pointer bg-violet-100 text-violet-700 font-semibold px-4 py-2 rounded-lg hover:bg-violet-200 transition duration-200"
          >
            Select File
          </label>

          {file !== null ? (
            <p className="text-black">Resume selected successfully</p>
          ) : null}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
