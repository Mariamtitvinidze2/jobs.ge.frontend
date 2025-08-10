"use client";

import React from "react";
import { Company } from "@/app/types/types";
import Link from "next/link";
import { Briefcase, Frown } from "lucide-react";

interface Props {
  company: Company;
}

export default function CompanyProfile({ company }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {typeof company.fullName === "string"
            ? company.fullName
            : `${company.fullName?.firstName ?? ""} ${
                company.fullName?.lastName ?? ""
              }`}
        </h1>

        <h2 className="text-2xl font-semibold text-purple-700 flex items-center gap-2 mb-6">
          <Briefcase className="w-6 h-6 text-purple-500" />
          Vacancies
        </h2>

        {company.vacansies && company.vacansies.length > 0 ? (
          <ul className="space-y-6">
            {company.vacansies.map((vacancy) => (
              <li
                key={vacancy._id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border"
              >
                <Link href={`/vacancies/${vacancy._id}`}>
                  <span className="text-xl font-medium text-purple-700 hover:underline cursor-pointer">
                    {vacancy.name}
                  </span>
                </Link>

                <p className="text-gray-600 mt-2">{vacancy.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Location: {vacancy.location}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Salary: {vacancy.sallery}$
                </p>

                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <h3 className="font-semibold mb-2">Submitted Resumes</h3>
                  {vacancy.resumes && vacancy.resumes.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {vacancy.resumes.map((resume) => (
                        <li key={resume._id}>
                          {typeof resume.user.fullName === "string"
                            ? resume.user.fullName
                            : `${resume.user.fullName?.firstName ?? ""} ${
                                resume.user.fullName?.lastName ?? ""
                              }`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Frown className="w-4 h-4" />
                      No resumes available yet
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
            <Frown className="w-10 h-10 mb-2 text-gray-400" />
            <p>No vacancies available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
