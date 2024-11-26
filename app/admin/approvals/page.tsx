import {Toaster} from "sonner";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ListingApprovalsTable, SellerApprovalsTable} from "@/app/admin/_components/approvals-panel";

export default function ApprovalsPanel() {
    return (
        <div className="p-4">
            <Toaster/>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className={"text-secondary text-4xl"}>Approvals Panel</CardTitle>
                    <CardDescription>Manage seller and listing approval requests</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="sellers">
                        <div className="flex justify-between items-center mb-4">
                            <TabsList>
                                <TabsTrigger value="sellers">Seller Requests</TabsTrigger>
                                <TabsTrigger value="listings">Listing Requests</TabsTrigger>
                            </TabsList>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    placeholder="Search requests..."
                                    className="pl-8 w-[250px]"
                                    // value={searchTerm}
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <TabsContent value="sellers">
                            <SellerApprovalsTable/>
                        </TabsContent>
                        <TabsContent value="listings">
                            <ListingApprovalsTable/>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}