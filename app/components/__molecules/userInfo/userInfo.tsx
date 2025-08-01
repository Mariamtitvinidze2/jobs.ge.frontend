"use client";

import { User, Vacancy } from "@/app/types/types";
import Image from "next/image";
import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export default function UserDescription({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(
    typeof user.fullName === "string"
      ? user.fullName
      : `${user.fullName?.firstName ?? ""} ${user.fullName?.lastName ?? ""}`
  );
  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(
      typeof user.fullName === "string"
        ? user.fullName
        : `${user.fullName?.firstName ?? ""} ${user.fullName?.lastName ?? ""}`
    );
    setIsEditing(false);
  };

  return (
    <div className="bg-[#e5e7eb] w-full max-w-[1000px] p-8 rounded-[20px] ml-[130px]  min-h-[82vh] shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b pb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ჩემს შესახებ
          </h1>
          <p className="text-sm text-gray-500">
            შექმნის თარიღი:{" "}
            <span className="font-medium text-gray-700">
              {user.createdAt.split("T")[0]}
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            გაგზავნილი რეზიუმეები:{" "}
            <span className="font-medium text-gray-700">
              {user.applies.length}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 relative rounded-full overflow-hidden ">
            <Image
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="user profile"
              fill
              className="object-cover"
            />
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="border rounded px-2 py-1 text-lg font-semibold text-gray-800"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button
                className="text-green-600 hover:text-green-800"
                onClick={handleSave}
                title="შენახვა"
              >
                <Check size={20} />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={handleCancel}
                title="გაუქმება"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                {editedName || "მომხმარებელი"}
              </h2>

              <button
                className="flex items-center gap-2 text-black  font-medium text-sm transition"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4" />
                რედაქტირება
              </button>
            </>
          )}
        </div>
      </div>

      {/* რეზიუმეების სია */}
      <div className="mt-6 space-y-4">
        {(user.applies as unknown as Vacancy[]).map((el, index) => (
          <div
            key={index}
            className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl shadow-sm"
          >
            <div className="flex gap-4 items-center">
              {el.company.avatar && (
                <Image
                  src={el.company.avatar}
                  alt="company picture"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {el.name || "ვაკანსიის დასახელება"}
                </h3>
                <p className="flex gap-2 text-sm text-gray-600 mt-1 items-center">
                  <Image
                    src="https://myjobs.ge/images/people.svg"
                    alt="people"
                    width={16}
                    height={16}
                  />
                  {typeof el.company.fullName === "string"
                    ? el.company.fullName || "კომპანიის სახელი"
                    : `${el.company.fullName?.firstName ?? ""} ${
                        el.company.fullName?.lastName ?? ""
                      }` || "კომპანიის სახელი"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  გაგზავნილი რეზიუმეები: {el.resumes.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
