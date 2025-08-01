import React from "react";
import Search from "../../__molecules/MIddle/middle";
import Image from "next/image";

import Link from "next/link";
import Vip from "../../../assets/images/Vip.png";
import VacancyImg from "../../../assets/images/job-vacancy_17929782.png";
import Arrow from "../../../assets/images/right-arrow_8066415.png";
import Vacancies from "../vacancies/Vacancies";
import Companies from "../../__molecules/allCompany/Companies";
import Header from "../header/Header";
export default function MainContainer() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-[3400px] max-w-[1440px] py-20 z-20 mt-[-60px] min-h-[200vh] px-[100px] mx-auto  max-[1058px]:px-[70px] max-[900px]:px-5 max-[450px]:px-3 transition-all duration-300 ">
        <div className="w-full px-16 py-8 flex flex-col  bg-gradient-to-r from-[#EDE8FC] to-[#D6C8FF]  gap-[20px] rounded-2xl relative mt-[100px] z-10 max-[800px]:hidden">
          <h1 className="text-[32px] text-black font-bold max-[1000px]:text-[26px]">
            იპოვე შენთვის <br /> საუკეთესო
          </h1>
          <Search />
        </div>

        <div className="mt-16 ">
          <div className="flex justify-between items-center mb-[30px]">
            <h1 className="text-[28px] text-black font-serif font-semibold flex gap-3 items-center ">
              <Image src={Vip} alt="office" width={40} height={40} />
              Super Vip vacancies
            </h1>
            <Link
              href="/vacancies"
              className=" hover:underline hover:text-purple-500 font-serif flex gap-2"
            >
              ყველას ნახვა
            </Link>
          </div>
          <Vacancies />
        </div>

        <div className="mt-28">
          <div className="flex justify-between items-center mb-[30px]ხ„">
            <h1 className="text-[28px] text-black font-semibold flex font-serif gap-3 items-center ">
              <Image src={Vip} alt="office" width={40} height={40} />
              Super Vip companies
            </h1>
            <Link
              href="companies"
              className=" hover:underline hover:text-purple-500 flex gap-2 font-serif"
            >
              ყველას ნახვა
            </Link>
          </div>
          <Companies />
        </div>
      </div>
    </div>
  );
}
