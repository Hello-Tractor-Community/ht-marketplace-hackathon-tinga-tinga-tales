'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {FilterSelectMenu} from "@/app/(dealer)/_components/select-menus";
import UsersTable from "@/app/admin/_components/users-table";
import UserDetailView from "@/app/admin/_components/UserDetailView";
import {useUsersContext} from "@/app/admin/context/users-context";

export default function Users() {
    const {isDetailView} = useUsersContext();


    return (
        <div className={"p-4"}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className={"text-secondary text-4xl"}>Users Panel</CardTitle>
                    <CardDescription>Manage and view user details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col xl:flex-row">
                        <div className={`flex-grow ${isDetailView ? 'hidden xl:block' : ''}`}>
                            <div className="mb-4 flex justify-between items-center">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        placeholder="Search users..."
                                        className="pl-8"
                                        // value={searchTerm}
                                        // onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <FilterSelectMenu/>
                            </div>
                            <UsersTable/>
                        </div>
                        {isDetailView && (
                            <div
                                className={`mt-4 xl:mt-0 xl:ml-6 xl:w-1/3 ${isDetailView ? 'block' : 'hidden xl:block'}`}>
                                <UserDetailView/>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}