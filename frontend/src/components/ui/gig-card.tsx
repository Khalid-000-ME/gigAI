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
    <div>
        <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{content}</p>
        </CardContent>
        <CardFooter>
            <p>{footer}</p>
        </CardFooter>
        </Card>
    </div>
  )
}
