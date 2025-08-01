"use client";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import AdminHeader from "@/app/components/__molecules/adminheader/AdminHeader";
import IsLoggedIn from "@/app/guard/IsLogedIn.guard";
import { axiosInstance } from "@/app/lib/axios-instance";
import { Company, Token, User } from "@/app/types/types";
import { ApprovalSchema, ApprovalType } from "@/app/validations/Approval-shema";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, FileText } from "lucide-react";

export default function CompanyApproval() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | User>();
  const [status, setStatus] = useState<String | undefined>("");
  const [modal, setModal] = useState(false);
  const token = getCookie("token");
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ApprovalSchema),
  });

  const getCompany = async ({ token }: Token) => {
    const resp = await axiosInstance.get(`admin/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    if (resp.status === 200) setCompany(resp.data);
  };

  useEffect(() => {
    if (token) getCompany({ token });
    setLoading(false);
  }, []);

  const onSubmit = async ({ status }: ApprovalType) => {
    const resp = await axiosInstance.patch(
      `/admin/company-approval/${id}`,
      { status },
      {
        headers: {
          authorization: ` Bearer ${token}`,
        },
      }
    );

    if (resp.status === 200) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        setStatus(status);
        router.push("/admin/companies");
      }, 3000);
      await getCompany({ token });
    }
  };

  if (loading) return <LoadingOverlay />;

  return (
    <IsLoggedIn>
      <AdminHeader />

      <div className="p-4 min-h-screen bg-gray-100 flex items-center justify-center">
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fade-in text-center">
              <h2
                className={`text-lg font-bold mb-2 ${
                  company?.status === "rejected"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {company?.status === "rejected"
                  ? "თქვენ კომპანია არ დაამატეთ საიტზე"
                  : "თქვენ კომპანია წარმატებით დაამატეთ საიტზე"}
              </h2>
              <p className="text-sm font-semibold text-gray-700">
                სტატუსი:
                <span
                  className={`ml-2 ${
                    company?.status === "rejected"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {status}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {typeof company?.fullName === "string"
                ? company.fullName
                : `${company?.fullName?.firstName ?? ""} ${
                    company?.fullName?.lastName ?? ""
                  }`}
            </h1>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              {company?.email}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              {company?.avatar}
            </p>

            <p className="text-sm font-medium">
              სტატუსი:
              <span
                className={`ml-2 ${
                  company?.status === "rejected"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {company?.status}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="block text-sm font-medium text-gray-700">
              აირჩიე სასურველი სტატუსი
            </p>

            <div className="flex gap-4">
              <label className="flex-1">
                <input
                  type="radio"
                  value="rejected"
                  {...register("status")}
                  className="hidden peer"
                />
                <div
                  className="flex items-center justify-center w-full px-4 py-2 border rounded-lg cursor-pointer transition-all
                peer-checked:bg-red-100 peer-checked:text-red-600 peer-checked:border-red-400
                bg-gray-100 text-gray-600 border-gray-300 hover:bg-red-50 font-semibold"
                >
                  ❌ უარყოფა
                </div>
              </label>

              <label className="flex-1">
                <input
                  type="radio"
                  value="approved"
                  {...register("status")}
                  className="hidden peer"
                />
                <div
                  className="flex items-center justify-center w-full px-4 py-2 border rounded-lg cursor-pointer transition-all
                peer-checked:bg-green-100 peer-checked:text-green-600 peer-checked:border-green-400
                bg-gray-100 text-gray-600 border-gray-300 hover:bg-green-50 font-semibold"
                >
                  ✅ დამტკიცება
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#A155B9] hover:bg-[#8e43a9] text-white w-full font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              გაგზავნა
            </button>
          </form>
        </div>
      </div>
    </IsLoggedIn>
  );
}
