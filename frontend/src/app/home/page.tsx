import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row justify-start gap-4 w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-10 m-4 justify-center">
          <div className="text-md text-slate-600 dark:text-slate-200">
            gigAI - v1.0
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center m-4 w-[90vw] h-[80vh] rounded-lg p-4 relative overflow-hidden shadow-2xl shadow-blue-600">
          
        </div>
      </main>
    </div>
  );
}
