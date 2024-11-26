'use client';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowLeft, UserCircle} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {useUsersContext} from "@/app/admin/context/users-context";

export default function UserDetailView() {
    const [newRole, setNewRole] = useState<UserRole>()
    const [newStatus, setNewStatus] = useState<UserStatus>()
    const {selectedUser, updateUser, cancelUpdate} = useUsersContext();
    if (!selectedUser) {
        return null
    }

    function handleUpdate(user: User) {
        console.log(user);
        console.log(newStatus);
        console.log(newRole);

        const userUpdate = {
            ...user,
            role: newRole || user.role,
            status: newStatus || user.status
        }
        console.log(userUpdate);

        updateUser(userUpdate)
    }


    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className={"text-secondary"}>User Details</CardTitle>
                    <Button variant="ghost" size="sm" onClick={cancelUpdate}
                            className="xl:hidden">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to List
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder-avatar.jpg"
                                             alt={selectedUser.name}/>
                                <AvatarFallback>
                                    <UserCircle className="h-16 w-16"/>
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={newRole || selectedUser.role}
                                        onValueChange={(value: UserRole) => setNewRole(value)}>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select role"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                                        <SelectItem value="SELLER">SELLER</SelectItem>
                                        <SelectItem value="DEALER">DEALER</SelectItem>
                                        <SelectItem value="OPERATOR">OPERATOR</SelectItem>
                                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={newStatus || selectedUser.status}
                                        onValueChange={(value: UserStatus) =>{
                                            console.log(value);
                                            setNewStatus(value)}
                                }>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Unapproved">Unapproved</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Approved">Approved</SelectItem>
                                        <SelectItem value="Banned">Banned</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/*<div className="grid gap-2">*/}
                            {/*    <Label>Phone</Label>*/}
                            {/*    <Input disabled value={selectedUser?.phone} readOnly/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={cancelUpdate}>Cancel</Button>
                            <Button
                                onClick={() => handleUpdate(selectedUser)}
                                disabled={(!newRole && !newStatus)}
                                className={"bg-primary/80 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary dark:text-background"}>Save
                                Changes</Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}