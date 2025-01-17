import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ProfileValues } from "@/components/ui/profile-values";

export default function Home() {


  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-center w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center m-4 justify-center">
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center m-4 mb-10 w-[25vw] h-[25vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <Image 
          src='/favicon.ico'
          width={200}
          height={200}
          alt="Profile picture"
          />
        </div>
        <div className="flex flex-col justify-center m-4 mb-10 w-[90vw] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          <Separator className="my-4"/>
        </div>

      </main>
    </div>
  );
}
