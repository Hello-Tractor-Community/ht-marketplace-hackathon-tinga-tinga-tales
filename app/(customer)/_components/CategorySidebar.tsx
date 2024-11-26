'use client'

import { User2, Mail, Heart, LogOut, Key } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CategorySidebar() {
    const router = useRouter()

    const handleNavigation = (path: string) => {
        router.push(path)
    }

    return (
        <div className={"lg:h-[100%] xl:w-[90%] bg-primary/90 flex flex-col justify-between rounded-lg m-2"}>
            <div className="">
                <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 h-12 hover:bg-secondary hover:text-background text-background font-bold text-base rounded-none rounded-t-lg"
                    onClick={() => handleNavigation('/account')}
                >
                    <User2 size={20} className="text-background "/>
                    <span>My Account</span>
                </Button>

                <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 h-12 hover:bg-secondary hover:text-background text-background font-bold text-base rounded-none"
                    onClick={() => handleNavigation('/account/inbox')}
                >
                    <Mail size={20} className="text-background "/>
                    <span>Inbox</span>
                </Button>

                <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 h-12 hover:bg-secondary hover:text-background text-background font-bold text-base rounded-none"
                    onClick={() => handleNavigation('/account/wishlist')}
                >
                    <Heart size={20} className="text-background "/>
                    <span>Wishlist</span>
                </Button>

                <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 h-12 hover:bg-secondary hover:text-background text-background font-bold text-base rounded-none"
                    onClick={() => handleNavigation('/account/password')}
                >
                    <Key  size={20} className="text-background "/>
                    <span>Manage Password</span>
                </Button>
            </div>
            <div className="border border-b-0 border-r-0 border-l-0 border-t-secondary">
                <Button
                    variant={"ghost"}
                    className="w-full h-12 hover:bg-secondary hover:text-background text-background font-bold text-base rounded-none rounded-b-lg"
                    onClick={() => {
                        // Add sign out logic here
                        router.push('/login')
                    }}
                >
                    <span>Sign Out</span>
                    <LogOut size={20} className="text-background ml-2"/>
                </Button>
            </div>
        </div>
    )
}

