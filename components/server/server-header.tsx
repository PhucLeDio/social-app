"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
};

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem onClick={() => onOpen("invite", { server })} className="cursor-pointer text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm">
                        Invite people
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("editServer", { server })} className="cursor-pointer px-3 py-2 text-sm">
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("members", { server })} className="cursor-pointer px-3 py-2 text-sm">
                        Manage Members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("createChannel")}
                    className="cursor-pointer px-3 py-2 text-sm"
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("deleteServer", { server })}
                    className="cursor-pointer px-3 py-2 text-sm text-red-600"
                    >
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto" color="red" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                    onClick={() => onOpen("leaveServer", { server })}
                     className="cursor-pointer px-3 py-2 text-sm text-red-600"
                     >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto" color="red" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}