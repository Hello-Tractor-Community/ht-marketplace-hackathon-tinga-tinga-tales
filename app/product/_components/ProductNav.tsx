'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Inbox, User2, Menu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResponsiveNavbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    return (
        <nav className="flex flex-wrap items-center justify-between gap-2 lg:px-4 px-2 py-2 bg-white ">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link href="/public" className="flex items-center mr-6">
                    <Image src="/HT_LOGO.png" alt="Logo" width={100} height={100} className="lg:h-14 h-10 w-auto" />
                </Link>
            </div>

            <div className="w-full md:w-auto lg::w-96 flex items-center justify-between md:justify-start gap-2 md:gap-4 order-3 md:order-none">
                <div
                    className="flex flex-1 md:flex-row flex-row md:items-center items-start justify-between gap-4 rounded-lg shadow-md p-2 border">

                    <Input
                        className="w-72 md:w-auto lg:w-80 focus:border-none focus-visible:ring-0 rounded-md p-2 border-none shadow-none"
                        placeholder="Search for a tractor"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        aria-label="Search"
                        className="bg-primary text-white hover:bg-primary-dark rounded-xl p-2"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* User Profile Section (Large Screens) */}
            <div className="hidden md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center space-x-3 border rounded-xl px-2 py-1 shadow-md">
                            <Image src="/tractors/tractor1.png" width={40} height={40} alt="user profile"
                                   className="rounded-xl border p-1" />
                            <p className="hidden lg:block">Joan</p>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="focus:bg-primary/20">
                            <Inbox className="mr-2 h-4 w-4" />
                            <span>Inbox</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/20">
                            <User2 className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Hamburger Menu (Small Screens) */}
            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Menu">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="focus:bg-primary/20">
                            <Inbox className="mr-2 h-4 w-4" />
                            <span>Inbox</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/20">
                            <User2 className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
