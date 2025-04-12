
import React, { Fragment } from 'react'
import useTools from '../hooks/useTools'
import { useDraw } from '../hooks/useDraw';


const ToolBar = ({
  className

}:{
  className?:string

}) => {

  const {setToolSelected, toolSelected, tools} = useTools();
  const {canvasRef} = useDraw();

  const setCursorCross = (tool:string) => {
    if(canvasRef.current)

      if(tool != "hand") {

        canvasRef.current.style.cursor= "crosshair"
      }
  }

  return (
    <div className={` border  dark:bg-gray-950 rounded-2xl p-2  flex gap-5 ${className}`}>

      {tools.map((tool, index) => (

        <Fragment key={index}>
        <div className={`aspect-square  cursor-pointer p-2 text-gray-500 rounded-xl relative hover:scale-110 duration-200 hover:bg-gray-200 hover:text-black ${toolSelected == tool.name?"bg-gray-200 !text-black":""} 

        `} 
    
        title={tool.title}
        onClick={() => {
          setToolSelected(tool.name);
          setCursorCross(tool.name)
        }}
        >
          {tool.icon}

          <p className="absolute bottom-0 right-1 text-xs text-gray-600">{index+1}</p>
        </div>

        {tool.name === "rect" && (
            <div className="border-r-2 border-gray-400 "></div> // Vertical pipe/divider
          )}

        </Fragment>
      ))}
      
    </div>
  )
}

export default ToolBar
