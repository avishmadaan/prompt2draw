"use client"

import { useTheme } from 'next-themes'

import { Sun, Moon } from "lucide-react"; 

const ThemeSwitcher = () => {

    const {theme,setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`border  bg-gray-950 rounded-xl p-4 h-full aspect-square flex justify-center items-center`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={24} />}
    </button>
  )
}

export default ThemeSwitcher
