"use client"

import { ModeToggle } from "@/components/ui/mode-toggle";
import { GigCard } from '@/components/ui/gig-card';
import { Menu } from "@/components/menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Gig {
  id: number,
  title: string,
  description: string,
  prize_pool: string,
  accepted_num: string,
  tags: {
    skills: string[] 
  }
}


export default function Home() {

  const router = useRouter();
  const [gigs, setGigs] = useState<Gig[]>( [{
    id: 0,
    title: "",
    description: "",
    prize_pool: "",
    accepted_num: "",
    tags: {
      skills: [""]
    }
  }]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/gigs/")
      const data = await response.json();
      setGigs(data)
      
    }
    fetchData();
  }, [])

  const handleGigClick = (id: number) => {
    router.push(`/gigs/${id}`)
  }

  console.log(gigs)

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-start w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center m-4 gap-10 justify-center">
          <div className="text-md text-slate-600 dark:text-slate-200">
            gigAI - v1.0
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-5 sm:grid cols-3 gap-4 m-10 relative overflow-hidden">
          {
            gigs.map((gig) => {
              return (
                <div onClick={()=>{handleGigClick(gig.id)}} className="text-ellipsis max-h-[30vw]">
                  <GigCard title={gig.title} description={gig.description} content={`$${gig.prize_pool}`} footer={`${gig.accepted_num}`} />
                </div>
              )
            })
          }
        </div>
      </main>
      <footer className="fixed bottom-0">
        <div className="flex flex-col mb-10">
          <Menu />
        </div>
      </footer>
    </div>
  );
}
