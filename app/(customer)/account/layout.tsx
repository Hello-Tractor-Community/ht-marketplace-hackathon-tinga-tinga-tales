import React from "react";
import CategorySidebar from "@/app/(customer)/_components/CategorySidebar";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import {redirect} from "next/navigation";
import {getCurrentSession} from "@/lib/server/sessions";
import {getWishlistAction} from "@/app/actions/wishlist/wishlist";
import {WishlistProvider} from "@/app/(customer)/account/context/wishlistContext";


export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const {user} = await getCurrentSession();

    if (!user) {
        return redirect("/");
    }
    const wishlist: Product[] = await getWishlistAction(user.id);


    return (
        <>
            <Header/>
            <main className="flex mx-auto xl:w-[60vw] h-[70vh] mt-16">
                <WishlistProvider products={wishlist}>
                    <div className="hidden lg:block">
                        <CategorySidebar/>
                    </div>
                    {children}
                </WishlistProvider>
            </main>
            <Footer/>
        </>
    )
}
