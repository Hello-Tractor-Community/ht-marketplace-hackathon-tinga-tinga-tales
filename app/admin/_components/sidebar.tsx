'use client';
import * as React from "react"
import {
    BookOpen,
    ChevronsUpDown, HelpCircle,
    Inbox, LayoutDashboard, ListTodo, Settings,
    User2, Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useMenuContext} from "@/context/menu-context";
import Link from "next/link";
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area";
import {logoutAction} from "@/app/actions/auth/logout";
import {toast} from "sonner"

const data = {
    menus: [
        {icon: LayoutDashboard, label: "Dashboard", href: "/admin"},
        {icon: Inbox, label: "Inbox", href: "/admin/inbox"},
        {icon: BookOpen, label: "Approvals", href: "/admin/approvals"},
        {icon: Users, label: "Users", href: "/admin/users"},
        {icon: ListTodo, label: "Listings", href: "/admin/listings"},
    ],

    otherMenuItems: [
        {icon: Settings, label: "Settings", href: "#settings"},
        {icon: HelpCircle, label: "Help Centre", href: "#help-centre"},
    ],
}

export function AdminSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: User }) {

    const {selectedMenu, setSelectedMenu} = useMenuContext();

    const handleItemClick = (label: string) => {
        setSelectedMenu(label)
    }
    const {
        state,
    } = useSidebar()
    return (
        <Sidebar variant={"floating"} collapsible="icon" {...props}>

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
                <ScrollArea>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.menus.map((item) => (
                                <SidebarMenuItem key={item.label} className={"rounded-lg mb-2"}>
                                    <SidebarMenuButton asChild
                                                       tooltip={item.label}
                                                       isActive={selectedMenu === item.label}
                                                       onClick={() => handleItemClick(item.label)}
                                                       className={"h-10 text-base"}>

                                        <Link href={item.href}>
                                            <item.icon className={"mr-2 opacity-80"}/>
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarSeparator className={" bg-secondary opacity-20"}/>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Other Menu
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.otherMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.label} className={"rounded-lg mb-2"}>
                                        <SidebarMenuButton asChild
                                                           isActive={selectedMenu === item.label}
                                                           onClick={() => handleItemClick(item.label)}
                                                           className={"h-10 text-base"}>
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
                </ScrollArea>
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
            <SidebarRail/>
        </Sidebar>
    )
}
