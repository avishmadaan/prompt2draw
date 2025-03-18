"use client"
import { Sparkles } from 'lucide-react'
import React from 'react'

const PromptBar = () => {
  return (
    <div className="w-full max-w-md">
    <div className="relative">

    <input
        type="text"
        placeholder="Draw a house with a window..."
        className="w-full py-3 pl-4 pr-12 border-4 border-transparent bg-transparent rounded-full shadow-lg 
          border-gradient-to-r from-pink-500 via-purple-600 to-indigo-700
          animate-pulse focus:outline-none   ring-2 "
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <button title='Draw With Prompt' type="submit" className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => {
            alert("drawing started");
        }}>
          <Sparkles />
          
        </button>
      </div>
    </div>
  </div>
  )
}

export default PromptBar
