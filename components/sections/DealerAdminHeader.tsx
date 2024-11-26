"use client"

import {Bell, Command, Moon, Search, Sun} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {useTheme} from "next-themes";
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import Image from "next/image";

export default function DealerAdminHeader({user} : {user: User}) {
    const [theme, changeTheme] = React.useState<'light' | 'dark'>('light')
    const {setTheme} = useTheme()
    const toggleTheme = () => {
        changeTheme(theme === 'light' ? 'dark' : 'light')
        setTheme(theme === 'light' ? 'dark' : 'light')
    }


    return (
        <header
            className="flex h-16 shrink-0 sticky top-2 items-center justify-between py-2 px-4 bg-gray-100 rounded-lg mt-2 mx-2 bg-sidebar border border-sidebar-border shadow ">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-6 bg-secondary opacity-20"/>
                <SearchBar/>
            </div>

            <div className="flex items-center md:gap-2">
                <div className={"flex gap-1 m-2"}>
                    <div className="hidden lg:flex gap-2 rounded-full bg-background p-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-3 rounded-full ${
                                theme === 'light'
                                    ? 'bg-gray-100 text-primary hover:text-primary'
                                    : 'hover:bg-gray-100 text-secondary/50'
                            }`}
                            onClick={() => toggleTheme()}
                        >
                            Light
                            <span className="sr-only">Light Mode</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-3 rounded-full ${
                                theme === 'dark'
                                    ? 'bg-gray-100 text-primary hover:text-primary'
                                    : 'hover:bg-gray-100 text-secondary/50'
                            }`}
                            onClick={() => toggleTheme()}
                        >
                            Dark
                            <span className="sr-only">Dark Mode</span>
                        </Button>
                    </div>


                    <div className={"hidden md:block lg:hidden rounded-full bg-background p-1"}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={toggleTheme}
                        >
                            {theme === 'light' ? (
                                <Moon className="h-4 w-4"/>
                            ) : (
                                <Sun className="h-4 w-4"/>
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                    <div className="hidden md:block relative rounded-full bg-background p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bell className="h-4 w-4"/>
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"/>
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </div>
                </div>
                <Separator orientation="vertical" className="h-6 bg-secondary opacity-20 m-1"/>

                <div className="flex items-center gap-2 bg-background rounded-full lg:p-2">
                    <div className="relative text-sm flex items-center">
                        <Image
                            src="/ephraim.jpeg"
                            alt="User avatar"
                            className="h-6 w-6 rounded-full lg:mr-2"
                            width={24}
                            height={24}
                        />
                        <span className="md:hidden absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"/>
                        <span className="hidden lg:block">{user.name}</span>
                    </div>
                    <div
                        className="hidden lg:block text-xs text-muted-foreground bg-gray-100 p-2 rounded-full">
                        {new Date().toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short'
                        })}
                    </div>
                </div>
            </div>
        </header>
    )
}

function SearchBar() {
    return (
        <div className="relative">
            <Search
                className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"/>
            <div
                className={"flex h-10 pl-8 items-center rounded-xl border bg-background px-3 shadow-sm"}
            >
                <Input
                    type="search"
                    placeholder="Type here to search"
                    className="h-full border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        disabled={true}
                        className="hidden lg:block h-auto px-1 text-sm font-normal text-muted-foreground hover:text-foreground"
                    >
                        <Command className="h-3 w-3"/>
                    </Button>
                    <Button
                        variant="ghost"
                        disabled={true}
                        className="hidden lg:block h-auto px-1 text-sm font-normal text-muted-foreground hover:text-foreground"
                    >
                        K
                    </Button>
                </div>
            </div>
        </div>
    );
}