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
  


export default function ProfileValues(data: string, record: string, copy: boolean, props: object) {

    const [copied, setCopied] = useState(false);

    const copyToClipBoard = () => {
        const result = navigator.clipboard.writeText(record);
        result.then(() => {
            setCopied(true);
        })
    }
  
  
  
    return (
        <div className="flex flex-row space-x-[50vw]">
            <div><p>{data}:</p></div>
            { copy && (

            <>
            <Badge variant="outline"><div className="text-ellipsis max-w-[20vw]"><p>0x4ad3fb31b961672ddec78bd10fbfd21ccbcfc3046bbf113b9a3fa5d62147b27a</p></div></Badge>
            
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <Button variant="outline" size="icon" onClick={copyToClipBoard}>
                        <Clipboard className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Copy to clipboard</span>
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    { ((copied == true) ? <p>Copied Successfully!</p> : <p>Copy to clipboard</p>) }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </>
            
            ) }

            { !copy && (

                <div className="text-ellipsis max-w-[20vw]">
                    <p>{record}</p>
                </div>

            )
            }

            
        </div>
  )
}
