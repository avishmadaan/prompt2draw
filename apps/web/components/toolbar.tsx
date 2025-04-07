
import React from 'react'
import useTools from '../hooks/useTools'


const ToolBar = ({
  className

}:{
  className?:string

}) => {

  const {setToolSelected, toolSelected, tools} = useTools();

  return (
    <div className={` border  dark:bg-gray-950 rounded-2xl p-2  flex gap-6 ${className}`}>

      {tools.map((tool, index) => (
        <div className={`aspect-square  cursor-pointer p-2 text-gray-400 rounded-xl relative hover:scale-110 duration-200 hover:bg-gray-300 hover:text-black ${toolSelected == tool.name?"bg-gray-300 !text-black":""} `} key={index}
        title={tool.title}
        onClick={() => {
          setToolSelected(tool.name);
        }}
        >
          {tool.icon}

          <p className="absolute bottom-0 right-1 text-xs text-gray-600">{index+1}</p>
        </div>
      ))}
      
    </div>
  )
}

export default ToolBar
