import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import React from "react";
import {Nunito} from "next/font/google"
import {Toaster} from "@/components/ui/sonner";
import {UserProvider} from "@/context/userContext";
import {getCurrentSession} from "@/lib/server/sessions";

const nunito = Nunito(
    {
        variable: "--font-nunito",
        weight: ["300", "400", "700", "900"],
        subsets: ["latin"],
    }
);

export const metadata: Metadata = {
    title: "Hello Tractor",
    description: "Get Your Tractors",
};

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const {user} = await getCurrentSession();

    return (
        <>

            <html lang="en" suppressHydrationWarning>
            <head><title></title></head>
            <body className={`${nunito.variable} antialiased`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <UserProvider user={user}>
                    {children}
                    <Toaster/>
                </UserProvider>
            </ThemeProvider>
            </body>
            </html>
        </>
    )
}
