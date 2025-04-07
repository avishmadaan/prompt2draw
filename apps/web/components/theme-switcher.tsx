"use client"

import { useTheme } from 'next-themes'

import { Sun, Moon } from "lucide-react"; 

const ThemeSwitcher = ({
  className
}:{
  className?:string
}) => {

    const {theme,setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={` border  dark:bg-gray-950 rounded-xl p-4 aspect-square flex justify-center items-center ${className}`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={24} />}
    </button>
  )
}

export default ThemeSwitcher
