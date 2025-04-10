"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { Circle, Eraser, Hand, Minus, MousePointer, Pencil, Pointer, RectangleHorizontal } from 'lucide-react'

type tool = {
  icon:React.ReactNode,
  title:string,
  name:string
}


type ToolContextType = {

    toolSelected:string,
    setToolSelected: React.Dispatch<React.SetStateAction<string>>,
    colorSelected:string,
    setColorSelected: React.Dispatch<React.SetStateAction<string>>,
    tools:tool[],
    colors:string[]

}




const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolContextProvider = ({children}:{
    children:React.ReactNode
}) => {

  const tools :tool[] =  [

    {
      icon:<Minus size={32}/>,
      title:"Line",
      name:"line"
    
    },
    {
      icon:<Circle size={28}/>,
      title:"Circle",
      name:"circle"
    },
    {
      icon:<RectangleHorizontal size={32}/>,
      title:"Rectangle",
      name:"rect"
    
    },
  
    {
      icon:<MousePointer size={32}/>,
      title:"Select",
      name:"select"
    
    },
    
    {
      icon:<Hand size={32}/>,
      title:"Hand",
      name:"hand"
    
    },
    {
      icon:<Eraser size={32}/>,
      title:"Eraser",
      name:"eraser"
    
    },
    
    ]
  
  const colors:string[] =[
      "#ef4444",
      "#facc15",
      "#22c55e",
      "#fff",
      "#000"
  ]
  

    const [toolSelected, setToolSelected] = useState<string>("line");
    const [colorSelected, setColorSelected] = useState<string>("#ef4444");

    return (
        <ToolContext.Provider value={{toolSelected, setToolSelected, colorSelected, setColorSelected,tools, colors}}>
            {children}
        </ToolContext.Provider>
    )
}


const useTools = ():ToolContextType => {

    const context = useContext(ToolContext);
    if (!context) {
        throw new Error("useTools must be used within an ToolContextProvider");
      }

      return context;
}

export default useTools
