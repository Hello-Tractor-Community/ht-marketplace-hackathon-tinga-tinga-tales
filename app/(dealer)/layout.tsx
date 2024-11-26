import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar"
import {DealerSidebar} from "@/app/(dealer)/_components/sidebar"
import React from "react";
import DealerAdminHeader from "@/components/sections/DealerAdminHeader";
import {MenuProvider} from "@/context/menu-context";
import {getCurrentSession} from "@/lib/server/sessions";
import {redirect} from "next/navigation";

export default async function Layout({children}: { children: React.ReactNode }) {
    const {user} = await getCurrentSession()
    if (!user) {
        return redirect("/sign_in")
    }
    // else if (user.role !== 'DEALER' && user.role !== 'OPERATOR') {
    //     return redirect("/")
    // }

    return (
        <SidebarProvider className={"lg:max-h-screen"}>
            <MenuProvider>
                <DealerSidebar user={user}/>
                <SidebarInset className={"lg:max-h-screen"}>
                    <DealerAdminHeader user={user}/>
                    <main className={"lg:h-[calc(100vh-5rem)]"}>
                        {children}
                    </main>
                </SidebarInset>
            </MenuProvider>
        </SidebarProvider>
    )
}
