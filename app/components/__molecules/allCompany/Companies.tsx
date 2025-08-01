"use client";

import { GetCompanies } from "@/app/api/Company.api";
import { Company } from "@/app/types/types";
import Image from "next/image";
import Email from "../../../assets/images/email_3624711.png";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingOverlay from "../../__atoms/loader/LOadingOverlay";
import Link from "next/link";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getRandomItems<T>(arr: T[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await GetCompanies()) as Company[];
        if (data && data.length > 0) {
          const randomCompanies = getRandomItems(data, 6); // Limit to 6 random companies
          setCompanies(randomCompanies);
          console.log("Fetched Companies:", randomCompanies); // Debug log
        } else {
          console.warn("No companies returned from GetCompanies.");
          setError("კომპანიების მონაცემები ვერ მოიძებნა.");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("შეცდომა კომპანიების ჩატვირთვისას.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingOverlay />;

  if (error) {
    return <h1 className="text-center text-red-600">{error}</h1>;
  }

  // Duplicate companies for seamless scrolling
  const loopedCompanies = [...companies, ...companies];

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 py-6 overflow-hidden"
    >
      <div className="relative w-full">
        <div className="flex animate-infinite-scroll">
          {loopedCompanies.length > 0 ? (
            loopedCompanies.map((company, index) => (
              <Link
                className="cursor-pointer flex-shrink-0 w-[295px] min-h-[160px] p-5 mx-2 rounded-xl border border-[#e5e7eb] shadow-md bg-white flex flex-col justify-between"
                href={`/companies/${company._id}`}
                key={`${company._id}-${index}`}
              >
                <div className="mb-3">
                  <h3 className="text-[16px] font-semibold text-[#1F2937]">
                    {typeof company.fullName === "string"
                      ? company.fullName
                      : `${company.fullName.firstName ?? ""} ${
                          company.fullName.lastName ?? ""
                        }`}
                  </h3>
                </div>
                <hr className="my-3 border-t border-gray-200" />
                <div className="flex flex-col gap-1 text-[14px]">
                  <p className="text-gray-500 line-clamp-3">
                    {company.description || "აღწერა არ არის"}
                  </p>
                  <p className="flex gap-2">
                    <Image src={Email} alt="email" width={18} height={18} />
                    {company.email || "ელ.ფოსტა არ არის"}
                  </p>
                  <p className="flex gap-2">
                    <Image
                      src="https://myjobs.ge/images/cases.svg"
                      alt="vacancy-icon"
                      width={20}
                      height={20}
                    />
                    {company.vacansies?.length || 0} ვაკანსია
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="text-center">ჯერჯერობით კომპანიები არ არის</h1>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infiniteScroll 30s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.div>
  );
};

export default Companies;
