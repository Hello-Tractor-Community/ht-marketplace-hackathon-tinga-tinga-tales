import React from "react";
import {ApprovalsProvider} from "@/app/admin/context/approvals-context";
import {getApprovalsAction} from "@/app/admin/actions/approvals-actions";


export default async function Layout({children}: { children: React.ReactNode }) {
    const {users, listings} = await getApprovalsAction();

    return (
        <ApprovalsProvider users={users} listings={listings}>
            <main className={"lg:h-[calc(100vh-5rem)]"}>
                {children}
            </main>
        </ApprovalsProvider>
    )
}
