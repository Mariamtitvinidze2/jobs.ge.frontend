"use client";
import Header from "@/app/components/__organisms/header/Header";
import { axiosInstance } from "@/app/lib/axios-instance";
import { Company } from "@/app/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getCompany = async () => {
    try {
      const resp = await axiosInstance.get(`/company/${id}`);
      if ((resp.status = 200)) {
        setCompany(resp.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);
  console.log(company);
  return (
    <div className="">
      <Header />
      <div className="w-full max-w-2xl mx-auto mt-25 bg-white rounded-2xl shadow-xl shadow-pu p-6 flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 self-center sm:self-start ">
          {company?.avatar && (
            <Image
              src={company?.avatar}
              alt={`${company?.fullName} avatar`}
              width={100}
              height={100}
              className="rounded-full object-cover border border-gray-200 shadow-sm"
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {typeof company?.fullName === "string"
              ? company.fullName
              : `${company?.fullName?.firstName ?? ""} ${
                  company?.fullName?.lastName ?? ""
                }`}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-prose">
            {company?.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Email:</span>
            <span>{company?.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">
              Number of Vacancies:
            </span>
            <span>{company?.vacansies?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
