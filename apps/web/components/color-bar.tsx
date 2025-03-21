import React from 'react'

const ColorBar = () => {
  return (
    <div className='border  dark:bg-gray-950 rounded-2xl p-3 flex-col px-4  flex gap-4 py-6'>

        <div className="rounded-full bg-red-500 h-8 w-8 cursor-pointer hover:scale-110 duration-200 hover:bg" id="color"></div>

        <div className="rounded-full bg-yellow-500 h-8 w-8 cursor-pointer hover:scale-110 duration-200" id="color"></div>

        <div className="rounded-full bg-green-500 h-8 w-8 cursor-pointer hover:scale-110 duration-200" id="color"></div>


      
    </div>
  )
}

export default ColorBar
