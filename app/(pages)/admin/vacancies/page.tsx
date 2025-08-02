"use client";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import { axiosInstance } from "@/app/lib/axios-instance";
import { Vacancy } from "@/app/types/types";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AdminHeader from "@/app/components/__molecules/adminheader/AdminHeader";
import Email from "../../../assets/images/email_3624711.png";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const token = getCookie("token");

  const getVacancies = async () => {
    const resp = await axiosInstance.get("admin/vacancies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status === 200) {
      setVacancies(
        resp.data.filter((vacancy: Vacancy) => vacancy.status === "pending")
      );

      setLoading(false);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <div>
      <AdminHeader />
      <div className="mt-20 w-full max-w-[1440px] px-[100px] mx-auto py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vacancies && vacancies.length > 0 ? (
            vacancies.map((el: Vacancy, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-[#e5e7eb] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-3 items-center justify-between mb-2">
                  <div className="flex gap-3 items-center">
                    {el.company.avatar ? (
                      <Image
                        src={el.company.avatar}
                        alt="company-profile"
                        width={30}
                        height={30}
                      />
                    ) : null}
                    <Link href={`/admin/vacancies/${el._id}`}>
                      <h1 className="text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer">
                        {el.name}
                      </h1>
                    </Link>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-2xl text-white font-bold ${
                      el.status === "pending"
                        ? "bg-[#e1de40]"
                        : el.status === "rejected"
                        ? "bg-[#f84863]"
                        : "bg-[#63f16d]"
                    }`}
                  >
                    {el.status}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[13px]">
                  <p className="text-gray-500 leading-relaxed line-clamp-3">
                    {el.description}
                  </p>
                  <p className="flex gap-2 items-center mt-2 text-gray-600">
                    <Image
                      src="https://myjobs.ge/images/people.svg"
                      alt="people"
                      width={20}
                      height={20}
                    />
                    დასაქმებული
                  </p>
                  <p className="flex gap-2 items-center text-gray-600">
                    <Image src={Email} alt="email" width={18} height={18} />
                    {el.company.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>ვაკანსიები არ არის</h1>
          )}
        </div>
      </div>
    </div>
  );
}
