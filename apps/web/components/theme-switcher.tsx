"use client"

import { useTheme } from 'next-themes'

import { Sun, Moon } from "lucide-react"; 

const ThemeSwitcher = () => {

    const {theme,setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`border p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 $ h-12 w-12 flex items-center justify-center`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeSwitcher
