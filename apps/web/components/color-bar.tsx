import React from 'react'
import useTools from '../hooks/useTools'

const ColorBar = (
  {
    className

  }:{
    className?:string
  }
) => {

  const {colorSelected, setColorSelected, colors}  = useTools();

  return (
    <div className={` border  dark:bg-gray-950 rounded-2xl p-3 flex-col px-4  flex gap-4 py-6 ${className}`}>

      {colors.map((color, index) => (
       (
          <div key={index} className={`rounded-full h-8 w-8 cursor-pointer hover:scale-110 duration-200 
             ${colorSelected == color?"scale-125 shadow-lg outline-1 outline outline-blue-500 p-4":""}`}
          onClick={() => {
            setColorSelected(color);
          }}
          style={{
            backgroundColor:color
          }}
          >
      
          
          </div>
        )
      ))}

      
      
    </div>
  )
}

export default ColorBar
