"use client";

import * as React from "react"
import { useTheme } from "next-themes"
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Home, 
  Menu, 
  MousePointer2, 
  Milestone, 
  Pocket, 
  LogIn, 
  UserPlus,
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useFavorites } from "@/components/favorites-context";
import { FavoritesPopover } from "@/components/favorites-popover";
import { Badge } from "@/components/ui/badge";

export default function MobileMenu() {
  const { setTheme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-blue-800/40 dark:bg-blue-800/10 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-xl font-semibold">
          <Link href="/" className="text-white flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span>ELITE ESTATE</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/browse"
            className="flex items-center space-x-2 text-white hover:text-slate-500"
          >
            <MousePointer2 className="h-5 w-5" />
            <span>Browse</span>
          </Link>
          <Link
            href="/post-ad"
            className="flex items-center space-x-2 text-white hover:text-slate-500"
          >
            <Milestone className="h-5 w-5" />
            <span>Post Ad</span>
          </Link>
          
          <FavoritesPopover />

          <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
          <Button variant="outline" asChild>
            <Link href="/login" className="flex items-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup" className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Signup</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link" aria-label="Open Menu">
                <Menu className="h-6 w-6 text-white hover:text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 flex flex-col h-full">
              <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>
              <div className="space-y-4 flex-grow">
                <Link
                  href="/browse"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <MousePointer2 className="h-5 w-5" />
                  <span>Browse</span>
                </Link>
                <Link
                  href="/post-ad"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Milestone className="h-5 w-5" />
                  <span>Post Ad</span>
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Pocket className="h-5 w-5" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-2 px-1.5 py-0.5 text-xs"
                    >
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
              </div>
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <br/>
                <Button variant="outline" asChild>
                  <a href="/login" className="flex items-center space-x-2 p-4">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </a>
                </Button>
                <br/>
                <Button variant="default" asChild>
                  <a href="/signup" className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Signup</span>
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}