"use client"

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeScript() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme || 'light')
  }, [resolvedTheme])

  return null
}