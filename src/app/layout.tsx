"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeScript } from "@/components/theme-script"
import { Toaster } from "@/components/ui/sonner"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FavoriteProvider } from '@/components/favorites-context';
import Header from "@/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ELITE ESTATE</title>
      </head>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DndProvider backend={HTML5Backend}>
          <FavoriteProvider>
          <ThemeScript />
          <Header/>
          <div className="mt-10"/>
          {children}
        </FavoriteProvider>
        </DndProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
