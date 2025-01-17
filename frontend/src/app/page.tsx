import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-center w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-10 m-4 justify-center">
          <div>
            <h1 className="text-4xl font-bold">gig-AI</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-4 justify-center items-center m-4 w-[90vw] h-[80vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <h1 className="z-10 text-6xl text-center font-bold">Enter a new world of opportunities!</h1>
          <Button asChild>
            <Link href="/home">Start Game ❤️</Link>
          </Button>
          <Meteors number={10} />
        </div>
      </main>
    </div>
  );
}
