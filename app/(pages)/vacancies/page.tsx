import React, { Suspense } from "react";
import Header from "@/app/components/__organisms/header/Header";
import VacanciesList from "@/app/components/__organisms/vacanciesList/VacanciesList";

export default function VacanciesPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>იტვირთება...</div>}>
                <VacanciesList />
            </Suspense>
        </>
    );
}
