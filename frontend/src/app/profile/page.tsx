"use client"

import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import ProfileValues from "@/components/ui/profile-values";
import { Fragment, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Menu } from "@/components/menu";

interface DataValues {
  email: string,
  company: string,
  skills: {
      skills: string[]
  },
  password: string,
  resume_uri: string,
  id: number,
  name: string,
  role: string,
  mongo_id: string
}
export default function Home() {

  const [dataValues, setDataValues] = useState<DataValues>({
    email: "",
    company: "",
    skills: {
      skills: [""]
    },
    password: "",
    resume_uri: "",
    id: 0,
    name: "",
    role: "",
    mongo_id: ""
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/users/?id=${localStorage.getItem('userId')}`);
      const data = await response.json();
      setDataValues(data);
      console.log(dataValues)
    }
    fetchData();
  }, []);


  const others = [
    {data: "Wallet Address", record: "0xC2e09a2dc61143D20EB4cE6DfB05DB5F39Da13c4", copy: true},
    {data: "Name", record: "John Doe", copy:false},
    {data: "City", record: "Banglore", copy:false}
  ]

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <header className="flex flex-row gap-4 justify-start w-full m-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-10 m-4 justify-center">
          <div className="text-md text-slate-600 dark:text-slate-200">
            gigAI - v1.0
          </div>
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
        {
          Object.entries(dataValues).map(([key, value]) => {
              if (key != "password" && key != "id" && key != "mongo_id") {
                if (key === "skills") {
                  console.log(value.skills)
                  return (
                    <>
                    <div className="flex flex-row" key={key}>
                      <div className="flex flex-col basis-1/2">
                        <h3>{String(key).charAt(0).toUpperCase() + String(key).slice(1)}:</h3>
                      </div>
                      <div className="flex flex-col basis-1/2">
                        <div className="flex flex-row gap-2">
                        {
                          value.skills.map((skill: any) => {
                            return (
                            <div>
                            <Badge>{skill}</Badge>
                            </div>
                            )
                          })
                        }
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    </>
                  );
                }

                return (
                  <Fragment key={key}>
                    <ProfileValues data={String(key).charAt(0).toUpperCase() + String(key).slice(1)} record={value} copy={false} />
                    <Separator className="my-4" />
                  </Fragment>
            );
            }
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
