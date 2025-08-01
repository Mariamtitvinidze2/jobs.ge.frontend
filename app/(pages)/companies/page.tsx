"use client";
import { GetCompanies } from "@/app/api/Company.api";
import { Company } from "@/app/types/types";
import Image from "next/image";
import Email from "../../assets/images/email_3624711.png";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import Header from "@/app/components/__organisms/header/Header";
import Link from "next/link";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = (await GetCompanies()) as Company[];
      if (data) {
        setCompanies(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Header />

      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-23 max-w-[1440px] w-full mx-auto px-[100px] max-[1300px]:px-[50px] max-[850px]:px-5"
      >
        <h1 className="text-[32px] font-semibold pb-3">ყველა კომპანია</h1>
        {loading ? (
          <LoadingOverlay />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {companies ? (
              companies.map((el: Company, index) => (
                <Link
                  className="cursor-pointer"
                  href={`companies/${el._id}`}
                  key={index}
                >
                  <div className="w-full max-w-[295px] p-5 rounded-2xl border-[1px] border-[#e5e7eb]  max-[639px]:max-w-full max-[639px]:rounded-xl">
                    <div className="flex gap-3 items-center">
                      {el.avatar ? (
                        <Image
                          src={el.avatar}
                          alt="company-profile"
                          width={30}
                          height={30}
                        />
                      ) : null}
                      <div className="">
                        <h1 className="text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer">
                          {typeof el.fullName === "string"
                            ? el.fullName
                            : `${el.fullName.firstName ?? ""} ${
                                el.fullName.lastName ?? ""
                              }`}
                        </h1>
                      </div>
                    </div>
                    <div className="mt-1 flex flex-col gap-2">
                      <p className="text-gray-500 text-[13px] text-base leading-relaxed max-w-prose line-clamp-3 ">
                        {el.description}
                      </p>
                      <p className="flex gap-2 text-[13px] mt-2">
                        <Image
                          src="https://myjobs.ge/images/people.svg"
                          alt="people"
                          width={20}
                          height={20}
                        />
                        დასაქმებული
                      </p>
                      <p className="flex gap-2 text-[13px]">
                        {" "}
                        <Image src={Email} alt="email" width={18} height={18} />
                        {el.email}
                      </p>
                      <p className="text-[#222220] flex gap-2 text-[13px] ">
                        {" "}
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
                </Link>
              ))
            ) : (
              <h1>კომპანიები არ არის</h1>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
