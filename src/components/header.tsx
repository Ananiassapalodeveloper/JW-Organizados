"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, User, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NavigationMenuOrganizado } from "./NavigationMenuOrganizado";
import Link from "next/link";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full border-b fixed z-50 top-0 left-0 right-0 bg-[hsl(var(--background))]">
      <div className="flex container items-center  mx-auto p-4 justify-between ">
        <Link href={"/"}>
        <h1 className="flex items-center  gap-1 font-semibold mb-0">
          <Users strokeWidth={3}/>
          Organizados
        </h1>
        </Link>
        <div className="flex items-center gap-1">
          <NavigationMenuOrganizado />

          <Button className="flex items-center gap-1">
            <User />
            Entrar
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
