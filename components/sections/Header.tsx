import Link from "next/link"
import Image from "next/image"
import {Heart, User, MessageCircle, Settings,ChevronDown, Tractor, Wrench, Store} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import {getCurrentSession} from "@/lib/server/sessions";
import ThemeToggle from "@/components/custom/theme_toggle";
import * as React from "react";
import Logout from "@/components/custom/logout_button";

export default async function Header() {
    const {user} = await getCurrentSession();
    // const { setTheme } = useTheme()
    // const [searchQuery, setSearchQuery] = useState("")
    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     console.log("Searching for:", searchQuery)
    //     // Implement search functionality here
    // }

    return (
        <header className="fixed top-0 z-20 w-full bg-background shadow-none border-none">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/public" className="flex items-center space-x-2">
                        <Image src="/HT_LOGO.png" alt="Logo" width={150} height={150} className="w-30 h-30"/>
                    </Link>

                    {/* Search Bar */}
                    {/*<form onSubmit={handleSearch} className="hidden sm:flex items-center flex-1 max-w-sm mx-4">*/}
                    {/*    <Input*/}
                    {/*        type="search"*/}
                    {/*        placeholder="Search tractors..."*/}
                    {/*        value={searchQuery}*/}
                    {/*        onChange={(e) => setSearchQuery(e.target.value)}*/}
                    {/*        className="w-full focus-visible:ring-transparent focus-visible:ring-offset-transparent shadow-none"*/}
                    {/*    />*/}
                    {/*    <Button type="submit" size="icon" className="ml-2 bg-primary hover:bg-transparent shadow-none hover:text-secondary">*/}
                    {/*        <Search className="h-4 w-4" />*/}
                    {/*        <span className="sr-only">Search</span>*/}
                    {/*    </Button>*/}
                    {/*</form>*/}

                    {/* Navigation Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <p className="hidden lg:block">{
                                    user ? user.name : "Account"
                                }</p>
                                <ChevronDown className="h-6 w-6"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            {
                                user ? <LoggedIn/> : <LoggedOut/>
                            }
                            <DropdownMenuSeparator/>
                            <DropdownMenuSeparator/>
                            <div className="flex space-x-1 justify-end">
                                {
                                    user && <Logout/>
                                }
                                <ThemeToggle/>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Mobile Search Bar */}
            {/*<form onSubmit={handleSearch} className="sm:hidden p-2">*/}
            {/*    <div className="flex items-center">*/}
            {/*        <Input*/}
            {/*            type="search"*/}
            {/*            placeholder="Search tractors..."*/}
            {/*            value={searchQuery}*/}
            {/*            onChange={(e) => setSearchQuery(e.target.value)}*/}
            {/*            className="w-full focus-visible:ring-transparent focus-visible:ring-offset-transparent shadow-none"*/}
            {/*        />*/}
            {/*        <Button type="submit" size="icon" className="ml-2 bg-primary hover:bg-transparent shadow-none hover:text-secondary">*/}
            {/*            <Search className="h-4 w-4" />*/}
            {/*            <span className="sr-only">Search</span>*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </header>
    )
}

function LoggedIn() {
    return (
        <>
            <DropdownMenuItem asChild>
                <Link href="/account/wishlist" className="flex items-center">
                    <Heart className="mr-2 h-4 w-4"/>
                    <span>Wishlist</span>
                    <span
                        className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                        0
                                    </span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4"/>
                    <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/account/inbox" className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4"/>
                    <span>Inbox</span>
                </Link>
            </DropdownMenuItem>
        </>
    )
}

function LoggedOut() {
    return (
        <>
            <div
                className={"w-full h-full gap-2 rounded-sm px-2 py-1.5 mx-auto flex justify-center bg-primary hover:bg-primary/80"}>
                <Link href="/sign_in" className="flex space-x-2 text-background ">
                    <Tractor className={"h-6 w-6"}/>
                    <span className={"font-bold text-lg"}>SIGN IN</span>
                </Link>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4"/>
                    <span>Sell</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center">
                    <Store className="mr-2 h-4 w-4"/>
                    <span>Dealer</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center">
                    <Wrench className="mr-2 h-4 w-4"/>
                    <span>Technician / Operator</span>
                </Link>
            </DropdownMenuItem>
        </>
    )
}
