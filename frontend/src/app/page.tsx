"use client"

import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-center w-full m-4 border-b-2 border-gray-200">
        <div className="flex flex-row items-center gap-10 m-4">
          <div>
            <Image
              className="invert-0 dark:invert"
              src='/logo-gig.png'
              width={200}
              height={200}
              alt="Logo - GIG - AI"
            />
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-4 justify-center items-center m-4 w-[90vw] h-[80vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <h1 className="z-10 text-6xl text-center font-bold">Enter a new world of opportunities!</h1>
          <Button asChild>
            <Link href="/profile">Start Game ❤️</Link>
          </Button>
          <Meteors number={10} />
        </div>
      </main>
    </div>
  );
}
