"use client";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import Header from "@/app/components/__organisms/header/Header";
import { axiosInstance } from "@/app/lib/axios-instance";
import { Vacancy } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Money from "../../../assets/images/money_5409901.png";
import Email from "../../../assets/images/email_3624711.png";
import AddResumeModal from "@/app/components/__molecules/Addcv/addCV";
import { getCookie } from "cookies-next";

export default function Page() {
  const token = getCookie("token");
  const role = getCookie("role");

  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getVacancy = async () => {
    try {
      const resp = await axiosInstance.get(`/vacancies/${id}`);
      if (resp.status === 200) {
        setVacancy(resp.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVacancy();
  }, []);

  const addResume = () => {
    if (!token) {
      router.push("/sign-in");
      return;
    }
    setModal(true);
  };

  if (loading) return <LoadingOverlay />;

  return (
    <div className="bg-gradient-to-tr from-[#f4f4f5] to-[#e0e7ff] mt-[30px] min-h-[110vh] pt-8 relative">
      <Header />
      <div className="w-full max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-gray-200 space-y-8">
        <div className="flex items-center gap-4">
          {vacancy?.company.avatar && (
            <Image
              src={vacancy.company.avatar}
              alt="Company Avatar"
              width={60}
              height={60}
              className="rounded-full border object-cover"
            />
          )}
          <div className="text-lg font-semibold text-gray-800">
            {typeof vacancy?.company.fullName === "string"
              ? vacancy.company.fullName
              : `${vacancy?.company.fullName?.firstName ?? ""} ${
                  vacancy?.company.fullName?.lastName ?? ""
                }`}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{vacancy?.name}</h1>
          <p className="text-sm text-gray-500">
            გამოქვეყნდა: {vacancy?.createdAt.split("T")[0]}
          </p>
        </div>
        <div className="text-sm text-gray-600 flex gap-2 items-center">
          <Link
            href={`/companies/${vacancy?.company._id}`}
            className="font-medium hover:underline hover:text-purple-600"
          >
            {typeof vacancy?.company.fullName === "string"
              ? vacancy?.company.fullName
              : `${vacancy?.company.fullName?.firstName ?? ""} ${
                  vacancy?.company.fullName?.lastName ?? ""
                }`}
          </Link>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{vacancy?.location}</span>
        </div>
        <div className="space-y-3">
          {vacancy?.sallery && (
            <div className="flex items-center text-gray-800 gap-2">
              <Image src={Money} alt="money" width={20} height={20} />
              <span className="text-[15px]">
                {vacancy?.sallery}$ - {vacancy?.sallery + 200}${" "}
                <span className="text-gray-500">/თვეში</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-800 text-sm">
            <Image src={Email} alt="email" width={20} height={20} />
            {vacancy?.company.email}
          </div>
        </div>
        <div className="pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ვაკანსიის აღწერა
          </h2>
          <p className="bg-purple-50 border-l-4 border-purple-500 pl-4 py-3 text-gray-700 leading-relaxed rounded-md text-sm">
            {vacancy?.description}
          </p>
        </div>
        {role !== "company" && (
          <div className="flex justify-center pt-6">
            <button
              onClick={addResume}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
            >
              გააგზავნე CV
            </button>
          </div>
        )}
      </div>
      {modal && <AddResumeModal vacancyId={vacancy?._id} setModal={setModal} />}
    </div>
  );
}
