import DashboardTable from "@/app/admin/_components/dashboard-table";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {getDashboardData} from "@/app/admin/actions/users-actions";
import QuickActionsCard from "./_components/QuickActions";


export default async function AdminDashboard() {
    const dashdata = await getDashboardData();


    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 h-full">
                <div className="grid auto-rows-min gap-4 xl:grid-cols-3 h-full">
                    <div className={"h-full"}>
                        <QuickActionsCard/>
                    </div>
                    <div className="hidden xl:block">
                        <RecentMessagesCard/>
                    </div>
                    <div className={"h-full"}>
                        <NewApprovalsCard users={dashdata.approvals}/>
                    </div>
                </div>
                <div className="rounded-xl h-full ">
                    <DashboardTable users={dashdata.users}/>
                </div>
            </div>

            {/*{selectedMenu === "Approvals" && <ApprovalsPanel/>}*/}
            {/*{selectedMenu === "Listings" && <ListingsPanel/>}*/}
        </>
    )
}

function RecentMessagesCard() {
    return (
        <Card className="rounded-xl bg-muted/50">
            <CardHeader>
                <CardTitle className={"text-secondary"}>Recent Messages</CardTitle>
                <CardDescription>Latest Messages and Feedback From Users</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="/placeholder-avatar.jpg"/>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Great product, fast shipping!</p>
                            <p className="text-xs text-muted-foreground">John Doe on Wireless Earbuds</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="/placeholder-avatar-2.jpg"/>
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Excellent quality, highly recommend!</p>
                            <p className="text-xs text-muted-foreground">Alice Smith on Smart Watch</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="/placeholder-avatar-2.jpg"/>
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Excellent quality, highly recommend!</p>
                            <p className="text-xs text-muted-foreground">Alice Smith on Smart Watch</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}



function NewApprovalsCard({users} : {users: User[]}) {

    return (
        <Card className="rounded-xl bg-muted/50">
            <CardHeader>
                <CardTitle className={"text-secondary flex justify-between w-full"}>
                    <span>New Approvals</span>
                    <Link href="/admin/approvals"
                        className="ml-2">View All
                    </Link>
                </CardTitle>
                <CardDescription>Latest Listings and Seller To Be Approved</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {
                        users.map(user => (
                            <div
                                key={user.id}
                                className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src="/placeholder-avatar.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        ))
                    }
                    {
                        users.length === 0 && <p className="text-sm text-muted-foreground">No new approvals</p>
                    }
                    {
                        // listingsApprovals.map(listing => (
                        //     <div className="flex items-start gap-4">
                        //         <Avatar>
                        //             <AvatarImage src="/placeholder-avatar.jpg"/>
                        //             <AvatarFallback>JD</AvatarFallback>
                        //         </Avatar>
                        //         <div className="space-y-1">
                        //             <p className="text-sm font-medium">{listing.name}</p>
                        //             <p className="text-xs text-muted-foreground">{listing.description}</p>
                        //         </div>
                        //     </div>
                        // ))
                    }
                    {
                        // listingsApprovals.length === 0 && <p className="text-sm text-muted-foreground">No new approvals</p>
                    }
                </div>
            </CardContent>
        </Card>
    );
}