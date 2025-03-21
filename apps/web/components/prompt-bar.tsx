"use client"
import { Button } from '@repo/ui/button';
import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const PromptBar = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const drawWithAi = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }
  return (
    <div className="w-full max-w-md ">
    <div className="relative">

    <input
        type="text"
        placeholder="Ex. Draw a house with a window..."
        className={`w-full py-4 pl-4 pr-16 border  bg-transparent rounded-2xl shadow-lg  dark:bg-gray-950 bg-white
          border-gradient-to-r from-pink-500 via-purple-600 to-indigo-700
           focus:outline-none ring-1 ${loading? "animate-pulse !ring-4":""} `}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Button
        variant='secondary'
       type="submit" className="text-gray-500 hover:text-gray-700 focus:outline-none !bg-transparent pl-0 pr-2 !translate-y-0 "
       loading={loading}
        onClick={drawWithAi}>
          <Sparkles />
          
        </Button>
      </div>
    </div>
  </div>
  )
}

export default PromptBar
