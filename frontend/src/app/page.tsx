import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import './globals.css'
import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-center w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center m-4 justify-center"><ModeToggle /></div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center m-4 w-[90vw] h-[80vh] rounded-lg p-4 relative overflow-hidden">
          <h1 className="z-10 text-4xl font-bold">Hello World</h1>
          <p className="z-10 text-lg">This is a test</p>
          <Meteors number={20} />
        </div>
      </main>
    </div>
  );
}
