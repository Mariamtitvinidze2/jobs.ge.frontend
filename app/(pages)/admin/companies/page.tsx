"use client";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import AdminHeader from "@/app/components/__molecules/adminheader/AdminHeader";
import { axiosInstance } from "@/app/lib/axios-instance";
import { Company } from "@/app/types/types";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import Email from "../../../assets/images/email_3624711.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IsLoggedIn from "@/app/guard/IsLogedIn.guard";

export default function page() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCompanies();
  }, []);

  const token = getCookie("token");

  const getCompanies = async () => {
    try {
      const resp = await axiosInstance.get("/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        setCompanies(
          resp.data.filter((company: Company) => company.status === "pending")
        );

        setLoading(false);
      }

      if (resp.status === 401) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401) {
        router.push("/");
      }
    }
  };

  if (loading) return <LoadingOverlay />;

  return (
    <IsLoggedIn>
      <div>
        <AdminHeader />
        <div className="mt-20 w-full max-w-[1440px] px-[100px] mx-auto py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies && companies.length > 0 ? (
              companies.map((el: Company, index) => (
                <div
                  className="p-5 rounded-2xl border border-[#e5e7eb] hover:shadow-lg transition-shadow duration-300"
                  key={index}
                >
                  <div className="flex gap-3 items-center justify-between mb-2">
                    <div className="flex gap-3 items-center">
                      {el.avatar ? (
                        <Image
                          src={el.avatar}
                          alt="company-profile"
                          width={30}
                          height={30}
                        />
                      ) : null}
                      <Link href={`/admin/companies/${el._id}`}>
                        <h1 className="text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer">
                          {typeof el.fullName === "string"
                            ? el.fullName
                            : `${el.fullName?.firstName ?? ""} ${
                                el.fullName?.lastName ?? ""
                              }`}
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
                    <p className="flex gap-2 items-center mt-2">
                      <Image
                        src="https://myjobs.ge/images/people.svg"
                        alt="people"
                        width={20}
                        height={20}
                      />
                      დასაქმებული
                    </p>
                    <p className="flex gap-2 items-center">
                      <Image src={Email} alt="email" width={18} height={18} />
                      {el.email}
                    </p>
                    <p className="flex gap-2 items-center text-[#222220]">
                      <Image
                        src="https://myjobs.ge/images/cases.svg"
                        alt="vacancy-icon"
                        width={20}
                        height={20}
                      />
                      {el.vacansies?.length || 0} ვაკანსია
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>კომპანიები არ არის</h1>
            )}
          </div>
        </div>
      </div>
    </IsLoggedIn>
  );
}
