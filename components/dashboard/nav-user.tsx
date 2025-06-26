"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {signOut} from "@/app/actions/auth-actions"
import useUser from "@/hooks/useUser";
import {capitalizeText, getInitials} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";

export function NavUser() {
    const {isMobile} = useSidebar()
    const {loading, user} = useUser();


    return (
        <>
            {
                loading ? (
                    <div className="w-ful flex items-center space-x-4">
                        <Skeleton className="h-8 w-8 rounded-full"/>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-[150px]"/>
                            <Skeleton className="h-3 w-[150px]"/>
                        </div>
                    </div>
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.user_metadata?.avatar_url}/>
                                            <AvatarFallback className="text-lg font-semibold bg-primary/10">
                                                {getInitials(user?.user_metadata?.full_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {
                                                    capitalizeText(user?.user_metadata?.full_name)
                                                }
                                            </span>
                                            <span className="truncate text-xs">{user?.email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user?.user_metadata?.avatar_url}/>
                                                <AvatarFallback className="text-lg font-semibold bg-primary/10">
                                                    {getInitials(user?.user_metadata?.full_name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {capitalizeText(user?.user_metadata?.full_name)}
                                                </span>
                                                <span className="truncate text-xs">{user?.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link className="flex items-center gap-2 w-full" href="/settings">
                                                <BadgeCheck/>
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Bell/>
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut/>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )
            }
        </>

    )
}
