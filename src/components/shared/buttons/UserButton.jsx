"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/shared/UserAvatar";
import {RiLogoutBoxRLine} from "react-icons/ri";
import {cn} from "@/lib/utils";
import {logout} from "@/auth";
import Cookies from 'js-cookie'


const UserButton = ({className}) => {
  const raw = Cookies.get('user')
  const user = raw ? JSON.parse(raw) : null
  console.log("user btn", user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar size={40}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Здійснено вхід як {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          <RiLogoutBoxRLine className={"mr-2 size-5"}/>
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
