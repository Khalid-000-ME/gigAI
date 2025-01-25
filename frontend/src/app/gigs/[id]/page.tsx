"use client"

import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import ProfileValues from "@/components/ui/profile-values";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {

  const [applied, setApplied] = useState(false);
  const [currentTab, setCurrentTab] = useState("overview");

  const dataValues = [
    {data: "Gig Name", record: "Typescript Card", copy: false},
    {data: "Description", record: "Design a card for our web app", copy:false},
    {data: "City", record: "Banglore", copy:false}
  ]


  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-start w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center m-4 justify-center gap-10">
          <div className="text-md text-slate-600 dark:text-slate-200">
            gigAI - v1.0
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        
        <div className="flex flex-row justify-center items-center">
          <Tabs defaultValue="overview" className="w-[400px]">
            <TabsList>
              <TabsTrigger onClick={()=>{setCurrentTab("overview")}} value="overview">Overview</TabsTrigger>
              <TabsTrigger onClick={()=>{setCurrentTab("submissions")}} value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        { (currentTab == "overview") && 

        (
        <>
        <div className="flex flex-col justify-center items-center m-4 mb-10 min-w-[90vw] min-h-[20vw] max-w-[90vw] max-h-[25vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <Image 
          className="dark:invert"
          src='/next.svg'
          width={700}
          height={200}
          alt="Profile picture"
          />
        </div>
        <div className="flex flex-col justify-center m-4 mb-10 w-[90vw] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          {
            dataValues.map((value) => {
              return(  <>
                <ProfileValues data={value.data} record={value.record} copy={value.copy} />
                <Separator className="my-4" />
                </>
              )
            })
          }
        </div>

        <div className="flex flex-row">

          {applied && (

            <div>
              <Button>
                Apply
              </Button>
            </div>

          )}

          {
            !applied && (

              <div>
                <Button>
                  Track status
                </Button>
              </div>
  
            )
          }


        </div> 
        </>
        )}
      </main>
    </div>
  );
}
