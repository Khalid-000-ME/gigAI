import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GigCard } from '@/components/ui/gig-card';
import { Menu } from "@/components/menu";


export default function Home() {

  const gigs = [
    {title: "Typescript card", description: "Design a card for our web app", content: "Our company is looking for a card to be made", footer: "buildspace, ontario"},
    {title: "Typescript card", description: "Design a card for our web app", content: "Our company is looking for a card to be made", footer: "buildspace, ontario"},
    {title: "Typescript card", description: "Design a card for our web app", content: "Our company is looking for a card to be made", footer: "buildspace, ontario"},
    {title: "Typescript card", description: "Design a card for our web app", content: "Our company is looking for a card to be made", footer: "buildspace, ontario"},
  ]


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
        <div className="grid grid-cols-3 sm:grid cols-2 gap-4 m-10 relative overflow-hidden">
          {
            gigs.map((gig) => {
              return (
                <GigCard title={gig.title} description={gig.description} content={gig.content} footer={gig.footer} />
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
