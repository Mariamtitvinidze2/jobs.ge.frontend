"use client";

import { axiosInstance } from "@/app/lib/axios-instance";
import { Vacancy } from "@/app/types/types";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../../__atoms/loader/LOadingOverlay";
import VacancyModal from "../../__molecules/vacanciesdDesc/vacanciesDesc";

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  function getRandomItems<Vacancy>(arr: Vacancy[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axiosInstance.get("vacancies", {});
        if (resp.status === 200) {
          const randomData = getRandomItems(resp.data, 10) as Vacancy[];
          setVacancies(randomData);
        }
      } catch (error) {
        console.error("Error fetching vacancies:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingOverlay />;
  const loopedVacancies = [...vacancies, ...vacancies];

  return (
    <>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-4 py-6 overflow-hidden"
      >
        <div className="relative w-full">
          <div className="flex animate-infinite-scroll">
            {loopedVacancies.map((el: Vacancy, index) => (
              <div
                key={`${el.name}-${index}`}
                onClick={() => setSelectedVacancy(el)}
                className="cursor-pointer flex-shrink-0 w-[295px] min-h-[160px] p-5 mx-2 rounded-xl border border-[#e5e7eb] shadow-md bg-white flex flex-col justify-between"
              >
                <h2 className="text-[16px] font-semibold text-[#1F2937] mb-2">
                  {el.name}
                </h2>
                <p className="text-[14px] text-gray-500 mb-2">
                  {el.sallery} ₾ თვეში
                </p>
                <hr className="my-3 border-t border-gray-200" />
                <div className="flex flex-col gap-1 text-[14px]">
                  <p className="text-[#1F2937] font-medium">
                    {typeof el.company.fullName === "string"
                      ? el.company.fullName
                      : `${el.company.fullName?.firstName ?? ""} ${
                          el.company.fullName?.lastName ?? ""
                        }`}
                  </p>
                  <p className="text-blue-500">{el.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {vacancies.length === 0 && (
          <h1 className="text-center mt-6">ვაკანსიები არ არის</h1>
        )}
      </motion.div>

      {selectedVacancy && (
        <VacancyModal
          vacancy={selectedVacancy}
          onClose={() => setSelectedVacancy(null)}
        />
      )}

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
    </>
  );
}
