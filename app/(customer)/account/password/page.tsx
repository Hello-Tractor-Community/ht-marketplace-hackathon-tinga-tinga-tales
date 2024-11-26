'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PasswordChangeForm() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prev => !prev)
    }

    return (
        <div className="container w-full m-2 mt-16 md:mt-4 shadow-sm">
            <Card className="w-full max-w-md shadow-none border-none mx-auto">
                <CardHeader>
                    <CardTitle className={"text-secondary text-2xl"}>Change Password</CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label className={"text-lg"} htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="pl-2 pr-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className={"text-lg"} htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    className="pl-2 pr-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => togglePasswordVisibility(setShowNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className={"text-lg"} htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="pl-2 pr-10 shadow-none border border-b-black border-r-0 border-l-0 border-t-0 rounded-none"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button type="submit" className="w-full bg-primary hover:bg-secondary">
                                Update Password
                            </Button>
                            <Button type="button" variant="outline" className="w-full border-secondary hover:border-primary hover:bg-transparent">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    {/* Footer content if needed */}
                </CardFooter>
            </Card>
        </div>
    )
}

