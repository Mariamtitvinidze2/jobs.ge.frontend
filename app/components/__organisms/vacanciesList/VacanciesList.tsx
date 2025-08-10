"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios-instance";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import { Company, User, Vacancy } from "@/app/types/types";
import Header from "../header/Header";
import { motion } from "framer-motion";
import Image from "next/image";
import Money from "../../../assets/images/money_5409901.png";
import { useGetCurrentUserOrCompany } from "@/app/lib/getCurrentUserOrCompany";
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function VacanciesList() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Company | User | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const searchParams = useSearchParams();
  const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany();
  const token = getCookie("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (token) await getCurrentUserOrCompany({ token, setUser });
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    const getVacancies = async () => {
      try {
        const params: Record<string, string> = {};
        const name = searchParams.get("name");
        const category = searchParams.get("category");
        const location = searchParams.get("location");
        const minSallery = searchParams.get("minSallery");
        const maxSallery = searchParams.get("maxSallery");

        if (name) params.name = name;
        if (category) params.location = category;
        if (location) params.location = location;
        if (minSallery) params.minSallery = minSallery;
        if (maxSallery) params.maxSallery = maxSallery;

        const resp = await axiosInstance.get("vacancies", { params });
        if (resp.status === 200) setVacancies(resp.data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      } finally {
        setLoading(false);
      }
    };

    getVacancies();
  }, [searchParams]);

  if (loading) return <LoadingOverlay />;

  if (!vacancies.length)
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
        <p className="text-sm">Check another category or location</p>
      </div>
    );

  return (
    <div>
      <Header />
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-24 max-w-[1440px] mx-auto px-[100px] max-[1300px]:px-[50px] max-[850px]:px-5"
      >
        <h1 className="text-[32px] font-semibold pb-6 text-center">
          Vacancies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vacancies.map((el: Vacancy, index) => (
            <Link
              href={`/vacancies/${el._id}`}
              key={index}
              className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-xl border border-[#e5e7eb] p-4 flex flex-col justify-between min-h-[220px] transition-all"
            >
              <div className="flex gap-3 items-center mb-3">
                {el.company.avatar && (
                  <Image
                    src={el.company.avatar}
                    alt="company-profile"
                    width={40}
                    height={30}
                    className="object-cover rounded"
                  />
                )}
                <div className="text-[16px] font-medium">
                  {typeof el.company.fullName === "string"
                    ? el.company.fullName
                    : `${el.company.fullName.firstName ?? ""} ${
                        el.company.fullName.lastName ?? ""
                      }`}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-[20px] line-clamp-1 mb-1">
                  {el.name}
                </h1>
                <p className="flex items-center gap-1 text-[13px] text-[#909090]">
                  <Image
                    src="https://myjobs.ge/images/secondaryPlace.svg"
                    alt="location"
                    width={18}
                    height={18}
                  />
                  {el.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
