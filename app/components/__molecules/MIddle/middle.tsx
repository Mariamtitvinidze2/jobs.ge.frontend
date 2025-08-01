"use client";

import { axiosInstance } from "@/app/lib/axios-instance";
import { SearchSchema, SearchType } from "@/app/validations/search-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { BsGrid } from "react-icons/bs";

import Glovo from "../../../assets/images/Glovo.png";
import Doctor from "../../../assets/images/Doctor.png";
import Musha from "../../../assets/images/Musha.png";
import Calculator from "../../../assets/images/Calculator.png";
import Mzareuli from "../../../assets/images/Mzareuili.png";
import Mushebi from "../../../assets/images/Mushebu.png";
import Xelosani from "../../../assets/images/Xelosani.png";
import Diasaxlisi from "../../../assets/images/Diasaxlisi.png";

export default function Search() {
  const [modal, setModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const router = useRouter();

  const fieldsList = [
    "IT და პროგრამირება",
    "საგანმანათლებლო",
    "მარკეტინგი",
    "ფინანსები",
    "სამედიცინო სფერო",
    "სამართალი",
    "სამშენებლო",
    "ბუღალტერია, ფინანსები",
    "ავტო-სერვისი",
    "განცხადება, მოლარე, კონსულტანტი",
    "განათლება",
    "გაყიდვები, მარკეტინგი",
    "დაზღვევა, ბანკები",
    "დასუფთავება",
    "დაცვა, უსაფრთხოება",
    "მზარეული, ბარმენი",
    "მექანიკა",
    "მშენებლობა",
    "რემონტი, შენმებობა",
    "საოფისე საქმე, ადმინისტრირება",
    "სასტუმრო, ტურიზმი",
    "სამშენებლო სამგზავროები",
    "სპორტი, გარიგება",
    "ინჟინერია",
    "სტატისტიკა",
    "მენეჯმენტი",
    "ლოგისტიკა, საქმეები",
    "ფარმაცია, ჯანმრთელობა",
    "ხელოვნება, მენეჯმენტი",
    "ხელოსანი, შეკეთება, მორთული",
    "ჭკა, მომღერლე, დამხმარე",
  ];

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SearchSchema),
  });

  const onSubmit = ({ name, category, minSallery, maxSallery }: SearchType) => {
    // URL query-ის აგება
    const query = new URLSearchParams();

    if (name) query.append("name", name);
    if (category) query.append("category", category);
    if (minSallery) query.append("minSallery", String(minSallery));
    if (maxSallery) query.append("maxSallery", String(maxSallery));

    // გადაგდება results გვერდზე ფილტრებით
    router.push(`/vacancies?${query.toString()}`);
  };

  const handleSearch = () => {
    // უბრალოდ წამოვიღოთ ტექსტი და კატეგორია და გადავხედოთ რა გამოვა
    onSubmit({
      name: searchQuery,
      category: selectedField,
      minSallery: undefined,
      maxSallery: undefined,
    });
  };

  const imagesUp = [Glovo, Doctor, Musha, Calculator];
  const imagesDown = [Mzareuli, Mushebi, Xelosani, Diasaxlisi];
  const imagesUpLoop = [...imagesUp, ...imagesUp];
  const imagesDownLoop = [...imagesDown, ...imagesDown];

  return (
    <div className="w-full max-w-[900px] mx-auto h-[230px] mt-[20px] bg-transparent py-4 px-6 transition-all duration-300 max-[700px]:m-0">
      <div className="flex flex-col lg:flex-row gap-6 ml-[-123px]">
        <form
          className="w-full lg:w-2/3 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative ml-[-30px] z-30 w-fit mt-[80px]">
            <div className="flex items-center bg-white rounded-2xl shadow-md w-[700px] px-4 py-2 relative z-30">
              <input
                type="text"
                placeholder="ჩაწერე პროფესია, სფერო ან კომპანია..."
                className="flex-grow outline-none text-sm text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <div
                className="flex items-center gap-2 text-sm text-black font-medium px-3 border-l border-gray-300 ml-2 cursor-pointer select-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <BsGrid />
                {selectedField || "აირჩიე სფერო"}
              </div>
              <button
                className="ml-3 bg-[#8054D3] text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
                onClick={handleSearch}
                type="button"
              >
                იპოვე
              </button>
            </div>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 bg-black/15 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div
                  className="absolute bg-white shadow-lg rounded-md w-[780px] max-h-60 overflow-y-auto z-30 top-full ml-[-10] mt-2"
                  style={{ left: "24px" }}
                >
                  <ul className="grid grid-cols-3 gap-2 text-gray-700 text-sm">
                    {fieldsList.map((field, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-purple-100 cursor-pointer select-none"
                        onClick={() => {
                          setSelectedField(field);
                          setValue("category", field);
                          setShowDropdown(false);
                        }}
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      {modal && (
        <div className="p-4 fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-[#9f9b9ba6] z-[10000]">
          <AnimatePresence>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex w-full justify-center h-[90vh] items-center">
                <div className="mb-6 border-b max-w-[350px] w-full mt-[10px] rounded-[20px] px-8 py-4 overflow-hidden bg-white border-neutral-200">
                  <div className="flex gap-3">
                    <div className="flex flex-col">
                      <label
                        htmlFor="minSallery"
                        className="mb-1 text-sm text-gray-700"
                      >
                        მინიმუმი
                      </label>
                      <input
                        {...register("minSallery")}
                        type="number"
                        id="minSallery"
                        className="outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 border border-gray-300 p-3 rounded-[20px] focus:border-[#a155b9] focus:ring-2 focus:ring-[#a155b9]"
                        placeholder="მაგ: 1000"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="maxSallery"
                        className="mb-1 text-sm text-gray-700"
                      >
                        მაქსიმუმი
                      </label>
                      <input
                        {...register("maxSallery")}
                        type="number"
                        id="maxSallery"
                        className="outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 border border-gray-300 p-3 rounded-[20px] focus:border-[#a155b9] focus:ring-2 focus:ring-[#a155b9]"
                        placeholder="მაგ: 3000"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <button
                      type="submit"
                      className="p-4 bg-[#a155b9] mt-2 rounded-full cursor-pointer text-white font-semibold hover:bg-[#8c3ca0] transition-colors"
                    >
                      ძებნა
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="flex gap-6 lg:w-1/3 max-[700px]:hidden ml-[700px] mt-[-279px]">
        <div className="relative w-[150px] h-[360px] overflow-hidden">
          <div className="absolute top-0 left-0 flex flex-col gap-3 animate-infinite-scroll-up">
            {imagesUpLoop.map((img, idx) => (
              <Image
                key={`up-${idx}`}
                src={img}
                alt={`up-${idx}`}
                width={150}
                height={150}
                className="rounded-xl shadow-md"
                draggable={false}
              />
            ))}
          </div>
        </div>
        <div className="relative w-[150px] h-[360px] overflow-hidden">
          <div className="absolute top-0 left-0 flex flex-col gap-3 animate-infinite-scroll-down">
            {imagesDownLoop.map((img, idx) => (
              <Image
                key={`down-${idx}`}
                src={img}
                alt={`down-${idx}`}
                width={150}
                height={150}
                className="rounded-xl shadow-md"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes infiniteScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-50% - 1.5rem));
          }
        }

        @keyframes infiniteScrollDown {
          0% {
            transform: translateY(calc(-50% - 1.5rem));
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-infinite-scroll-up {
          animation: infiniteScrollUp 30s linear infinite;
        }

        .animate-infinite-scroll-down {
          animation: infiniteScrollDown 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
