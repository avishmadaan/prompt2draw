import { Circle, Eraser, Hand, Minus, Pencil, RectangleHorizontal, Square } from 'lucide-react'
import React from 'react'

const tools : {
  icon:React.ReactNode,
  title:string
} []= [
{
  icon:<Pencil size={28} className=''/>,
  title:"Pencil",

},
{
  icon:<Minus size={32}/>,
  title:"Line",

},
{
  icon:<Circle size={28}/>,
  title:"Circle",

},
{
  icon:<RectangleHorizontal size={32}/>,
  title:"Rectangle",

},

{
  icon:<Hand size={32}/>,
  title:"Hand",

},
{
  icon:<Eraser size={32}/>,
  title:"Eraser",

},

]


const ToolBar = () => {
  return (
    <div className=' border  dark:bg-gray-950 rounded-2xl p-2    flex gap-6'>

      {tools.map((tool, index) => (
        <div className="aspect-square hover:bg-gray-300 hover:text-black cursor-pointer p-2 text-gray-400 rounded-xl relative hover:scale-110 duration-200" key={index}
        title={tool.title}
        >
          {tool.icon}

          <p className="absolute bottom-0 right-1 text-xs text-gray-600">{index+1}</p>
        </div>
      ))}



     
      
    </div>
  )
}

export default ToolBar
