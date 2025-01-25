import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./card";
  

export const GigCard = (
  {title, description, content, footer}: {title: string, description: string, content: string, footer: string}
) => {
  return (
    <div className='max-h-[30vw]'>
        <Card>
        <CardHeader>
            <CardTitle className='text-ellipsis'>{title}</CardTitle>
            <CardDescription className='truncate' >{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="line-clamp-3" >Prize: {content}</p>
        </CardContent>
        <CardFooter>
            <p className='truncate'>Accepted: {footer}</p>
        </CardFooter>
        </Card>
    </div>
  )
}
