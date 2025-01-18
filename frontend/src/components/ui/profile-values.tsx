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
  


export default function ProfileValues(
    {data, record, copy} : {data: string, record: string, copy: boolean}
) {

    const [copied, setCopied] = useState(false);

    const copyToClipBoard = () => {
        const result = navigator.clipboard.writeText(record);
        result.then(() => {
            setCopied(true);
        })
    }
  
  
  
    return (
        <div className="flex flex-row">
            <div className='flex flex-col basis-1/2' ><p>{data}:</p></div>
            { copy && (

            <div className='flex flex-col basis-1/2'>

                <div className='flex flex-row gap-2'>
                <Badge variant="outline"><div className="text-ellipsis overflow-hidden max-w-[20vw]"><p>{record}</p></div></Badge>
                
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <Button variant="outline" size="icon" onClick={copyToClipBoard}>
                            <Clipboard className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 invert" />
                            <span className="sr-only">Copy to clipboard</span>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        { ((copied == true) ? <p>Copied Successfully!</p> : <p>Copy to clipboard</p>) }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
            
            </div>
            
            ) }

            { !copy && (

                <div className="flex flex-col basis-1/2 text-ellipsis max-w-[20vw]">
                    <p>{record}</p>
                </div>

            )
            }

        </div>
  )
}
