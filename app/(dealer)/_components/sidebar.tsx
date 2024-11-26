"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar,
} from "@/components/ui/sidebar"
import {
    BarChart2,
    ChevronsUpDown, HelpCircle,
    LayoutDashboard,
    Inbox,
    ListTodo,
    Settings,
    ShoppingBag, Timer,
    User2
} from "lucide-react";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React from "react";
import {useMenuContext} from "@/context/menu-context";
import {logoutAction} from "@/app/actions/auth/logout";
import {toast} from "sonner";

type MenuItem = {
    icon: React.ElementType;
    label: string;
    href: string;
}

const mainMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#(dashboard)" },
    { icon: Inbox, label: "Inbox", href: "#inbox" },
    { icon: ListTodo, label: "Listing", href: "#listing" },
    { icon: Timer, label: "Bids", href: "#bids" },
    { icon: ShoppingBag, label: "Orders", href: "#orders" },
    { icon: BarChart2, label: "Statistics", href: "#statistics" },
]

const otherMenuItems: MenuItem[] = [
    { icon: Settings, label: "Settings", href: "#settings" },
    { icon: HelpCircle, label: "Help Centre", href: "#help-centre" },
]

export function DealerSidebar({user} : {user: User}) {
    const { selectedMenu, setSelectedMenu } = useMenuContext();

    const handleItemClick = (label: string) => {
        setSelectedMenu(label)
    }
    const {
        state,
    } = useSidebar()


    return (
        <Sidebar variant={"floating"} collapsible={"icon"} className={"h-full"}>
            <SidebarHeader>
                <SidebarMenu>
                    {state === "collapsed" && (
                        <div className={"mb-6"}>
                            <Image
                                src={"/HT_LOGO ICON.png"}
                                alt={"Logo"}
                                className={"object-contain absolute top-2 left-2"}
                                width={50}
                                height={50}
                            />
                        </div>
                    )}
                    {state === "expanded" && (
                        <div className={"h-14"}>
                            <Image
                                src={"/HT_LOGO.png"}
                                alt={"Logo"}
                                className={"object-contain absolute top-2 left-0"}
                                width={200}
                                height={200}
                            />
                        </div>
                    )}
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={"mt-2"}>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainMenuItems.map((item) => (
                                <SidebarMenuItem key={item.label} className={"rounded-lg mb-2"}>
                                    <SidebarMenuButton asChild
                                                       isActive={selectedMenu === item.label}
                                                       onClick={() => handleItemClick(item.label)}
                                                       className={"h-12 text-base"}>
                                        <Link href={item.href}>
                                            <item.icon className={"mr-2 opacity-80"}/>
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator className={" bg-secondary opacity-20"}/>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Other Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherMenuItems.map((item) => (
                                <SidebarMenuItem key={item.label} className={"rounded-lg mb-2"}>
                                    <SidebarMenuButton asChild
                                                       isActive={selectedMenu === item.label}
                                                       onClick={() => handleItemClick(item.label)}
                                                       className={"h-12 text-base"}>
                                        <Link href={item.href}>
                                            <item.icon className={"mr-2 opacity-80"}/>
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2/>
                                    <span>{user.email}</span>
                                    <ChevronsUpDown className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                className="w-28 justify-center m-2"
                            >
                                <DropdownMenuItem>
                                    <Link href={'/'}>
                                        <span>Back To Home</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span
                                        onClick={async() => {
                                            const m = await logoutAction()
                                            if(!m){
                                                toast("Logout", {description: "You have been logged out",})
                                            } else {
                                                toast("Error", {description: m.message})
                                            }
                                        } }
                                    >Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
