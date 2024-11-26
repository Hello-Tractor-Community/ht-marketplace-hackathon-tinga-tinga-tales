import React from "react";
import {UsersProvider} from "@/app/admin/context/users-context";
import {getUsersAction} from "@/app/admin/actions/users-actions";


export default async function Layout({children}: { children: React.ReactNode }) {
    const data = await getUsersAction();

    return (
        <UsersProvider users={data.data} pages={data.totalPages}>
            <main className={"lg:h-[calc(100vh-5rem)]"}>
                {children}
            </main>
        </UsersProvider>
    )
}
