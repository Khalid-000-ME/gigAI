import React from 'react';
import { ModeToggle } from './ui/mode-toggle';

export default function HeaderSection() {
  return (
    <div>
        <header className="flex flex-row gap-4 justify-start w-full m-4 border-b-2 border-gray-200">
            <div className="flex items-center m-4 justify-center gap-10">
                <div className="text-md text-slate-600 dark:text-slate-200">
                    gigAI - v1.0
                </div>
                <ModeToggle />
            </div>
        </header>
    </div>
  )
}
