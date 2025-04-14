"use client"
import React, { useContext, useRef, useState, useEffect } from 'react'
import { createContext } from 'react'
import { Circle, Eraser, Hand, Minus, MousePointer, RectangleHorizontal } from 'lucide-react'

type tool = {
  icon:React.ReactNode,
  title:string,
  name:string
}

type ToolContextType = {
    toolSelected:string,
    setToolSelected: React.Dispatch<React.SetStateAction<string>>,
    strokeColorSelected:string,
    setStrokeColorSelected: React.Dispatch<React.SetStateAction<string>>,
    bgColorRef:React.RefObject<string>,
    tools:tool[],
    strokeColors:string[],
    bgColors:string[]
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolContextProvider = ({children}:{
    children:React.ReactNode
}) => {
  const [mounted, setMounted] = useState(false);
  const [toolSelected, setToolSelected] = useState<string>("line");
  const [strokeColorSelected, setStrokeColorSelected] = useState<string>("#D2D3D2");
  const bgColorRef = useRef<string>("none");

  useEffect(() => {
    setMounted(true);
  }, []);

  const tools :tool[] = [
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
  
  const strokeColors:string[] = [
    "#D2D3D2",
    "#FF7877",
    "#308F41",
    "#589AE0",
    "#AE5901",
  ]

  const bgColors:string[] = [
    "#5A2C2C",
    "#013905",
    "#0E3F5F",
    "#352401",
  ]

  if (!mounted) {
    return null; // or return a loading state
  }

  return (
    <ToolContext.Provider value={{
      toolSelected, 
      setToolSelected, 
      strokeColorSelected, 
      setStrokeColorSelected,
      tools, 
      strokeColors, 
      bgColorRef, 
      bgColors
    }}>
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
