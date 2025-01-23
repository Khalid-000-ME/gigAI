import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { SubForm } from "@/components/submit-gig";


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
        <div className="flex flex-col gap-4 justify-center items-center m-4 w-[60vw] min-h-[80vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <SubForm/>
        </div>
      </main>
    </div>
  );
}
