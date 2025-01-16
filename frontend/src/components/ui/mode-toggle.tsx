"use client"

import * as React from "react";
import { Moon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [theme, settheme] = useState("dark");

  const changeTheme = () => {
    if (theme === "light") {
        settheme("dark")
      setTheme(theme);
    } else {
        settheme("light");
        setTheme(theme);
    }
  }

  return (
        <Button variant="outline" size="icon" onClick={changeTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  )
}