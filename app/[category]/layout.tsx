import React from "react";
import Header from "@/components/sections/Header";
import Banner from "@/components/sections/HeroesSection";
import Footer from "@/components/sections/Footer";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <div className={"flex flex-col justify-between"}>
                <Banner/>
                {children}
            </div>
            <Footer/>
        </>
    )
}