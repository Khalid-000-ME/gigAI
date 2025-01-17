"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  


export default function ProfileValues(props: any) {

    const [copied, setCopied] = useState(false);

    const copyToClipBoard = () => {
        const result = navigator.clipboard.writeText(props.record);
        result.then(() => {
            setCopied(true);
        })
    }
  
  
  
    return (
        <div className="flex flex-row space-x-[50vw]">
            <div><p>{props.data}:</p></div>
            { props.copy && (

            <div className='flex flex-row gap-2'>
            <Badge variant="outline"><div className="text-ellipsis overflow-hidden max-w-[20vw]"><p>{props.record}</p></div></Badge>
            
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <Button variant="outline" size="icon" onClick={copyToClipBoard}>
                        <Clipboard className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
                        <span className="sr-only">Copy to clipboard</span>
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    { ((copied == true) ? <p>Copied Successfully!</p> : <p>Copy to clipboard</p>) }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </div>
            
            ) }

            { !props.copy && (

                <div className="text-ellipsis max-w-[20vw]">
                    <p>{props.record}</p>
                </div>

            )
            }

            
        </div>
  )
}
