"use client"

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { BicepsFlexed } from "lucide-react";
import { Send } from 'lucide-react';
import { FileUser } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  


  export function Menu() {

    const router = useRouter();

    const goProfile = () => {
        router.push('/profile')
    }

    const goGigs = () => {
        router.push('/gigs')
    }

    const goSubmissions = () => {
        router.push('/submissions')
    }

    const goResume = () => {
        router.push('/resume')
    }



    return (
      <Menubar className="cursor-pointer">
        <MenubarMenu>
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <MenubarTrigger onClick={goProfile}>
                    <User className="cursor-pointer transition hover:scale-150" size={20}/>
                </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>
            <p>Profile</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        </MenubarMenu>
        <MenubarMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <MenubarTrigger onClick={goGigs}>
                <BicepsFlexed className="cursor-pointer transition hover:scale-150" size={20}/>
                </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>
            <p>GIGS</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </MenubarMenu>
        <MenubarMenu>
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <MenubarTrigger onClick={goSubmissions}>
                <Send className="cursor-pointer transition hover:scale-150" size={18}/>
                </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>
            <p>My submissions</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        </MenubarMenu>
        <MenubarMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <MenubarTrigger onClick={goResume}>
                <FileUser className="cursor-pointer transition hover:scale-150" size={20}/>
                </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>
            <p>Resume Analysis</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </MenubarMenu>
      </Menubar>
    )
  }
  