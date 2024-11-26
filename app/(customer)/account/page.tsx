'use client'

import {useState} from "react"
// import { useFormState } from "react-dom"
import {
    User, Mail, Phone,
    // Check, AlertCircle
} from 'lucide-react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useUserContext} from "@/context/userContext";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { updateProfile } from "../actions"


export default function AccountPage() {
    const [isEditing, setIsEditing] = useState(false)
    // const [profileState, profileAction] = useFormState(updateProfile, null)

    const {user} = useUserContext();
    if (!user) return null;

    return (
        <div className="container w-full m-2 shadow-sm mt-16 md:mt-4">
            <Card className={"shadow-none max-w-2xl mx-auto border-none"}>
                <CardHeader>
                    <CardTitle className={"text-secondary text-2xl"}>Account Overview</CardTitle>
                    <CardDescription>
                        Manage your account settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form
                        // action={profileAction}
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={user.name}
                                        disabled={!isEditing}
                                        className="pl-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user.email}
                                        disabled={!isEditing}
                                        className="pl-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                </div>
                            </div>

                            {
                                user.phone && (
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Input
                                                id="phone"
                                                name="phone"
                                                defaultValue={user.phone}
                                                disabled={!isEditing}
                                                className="pl-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                            />
                                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                        </div>
                                    </div>
                                )
                            }


                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-row items-start justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="destructive"
                            type="submit"
                            className={"bg-primary"}
                            // onClick={profileAction.reset}
                        >
                            Save Changes
                        </Button>
                    )}

                    {/*{profileState?.success && (*/}
                    {/*    <Alert variant="default" className="w-full">*/}
                    {/*        <Check className="h-4 w-4" />*/}
                    {/*        <AlertTitle>Success</AlertTitle>*/}
                    {/*        <AlertDescription>*/}
                    {/*            {profileState.success}*/}
                    {/*        </AlertDescription>*/}
                    {/*    </Alert>*/}
                    {/*)}*/}

                    {/*{profileState?.error && (*/}
                    {/*    <Alert variant="destructive" className="w-full">*/}
                    {/*        <AlertCircle className="h-4 w-4" />*/}
                    {/*        <AlertTitle>Error</AlertTitle>*/}
                    {/*        <AlertDescription>*/}
                    {/*            {profileState.error}*/}
                    {/*        </AlertDescription>*/}
                    {/*    </Alert>*/}
                    {/*)}*/}
                </CardFooter>
            </Card>
        </div>
    )
}

