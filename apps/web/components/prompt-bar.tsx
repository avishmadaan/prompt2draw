"use client"
import { Button } from '@repo/ui/button';
import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useAi } from '../hooks/useAi';
import { useDraw } from '../hooks/useDraw';
import { useNotification } from '../hooks/useNotification';
import { get } from 'http';

const PromptBar = ({
  className
}:{
  className?:string
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {promptInput, getAiReply} = useAi();
  const {offSet, reDrawShapes, shapesRef} = useDraw();
  const [inputValue, setInputValue] = useState("");

  const {showNotification} = useNotification();

  const drawWithAi = async() => {

    if(!shapesRef.current) return;

    if(promptInput.current && promptInput.current.value =="") {

      showNotification({
        type:"negative",
        message:"Empty Input"
      })
      
      return;
    }

//     if(promptInput.current && promptInput.current.value == "") {
//       showNotification({
//         type:"negative",
//         message:"Input Empty"
//       })

//       console.log("hello")
//       return;
//     }
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//     }, 5000)


//     const intervalId = setInterval(() => {
//       const {offsetX, offsetY} = offSet.current;
//       offSet.current = {
//         offsetX: offsetX -100,
//         offsetY: offsetY
//       }





//       reDrawShapes()

//       console.log("offset updated")

//     }, 1000);

//  setTimeout(() => {

//       clearInterval(intervalId);

//     }, 10000)

setLoading(true);
await getAiReply();
setLoading(false);
setInputValue("");

if (promptInput.current) {
  promptInput.current.value = "";
}


// const shapes = [
//   {
//     "id": "f7a6ab76-db5d-4d9a-a3ec-951ddd1c5bc1",
//     "type": "circle",
//     "x1": 430,
//     "y1": 170,
//     "x2": 490,
//     "y2": 230,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "836e57b0-a899-484e-9cfd-9c66c05b983b",
//     "type": "circle",
//     "x1": 412.43,
//     "y1": 212.43,
//     "x2": 472.43,
//     "y2": 272.43,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "3d837efc-7e5c-4fcb-acd0-a8b29f39475e",
//     "type": "circle",
//     "x1": 370,
//     "y1": 230,
//     "x2": 430,
//     "y2": 290,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "4ededc72-035d-43e6-83d9-10e60feba86b",
//     "type": "circle",
//     "x1": 327.57,
//     "y1": 212.43,
//     "x2": 387.57,
//     "y2": 272.43,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "12330c62-6973-44a0-9316-d59e033c24d9",
//     "type": "circle",
//     "x1": 310,
//     "y1": 170,
//     "x2": 370,
//     "y2": 230,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "92d9d7ef-a77b-4e1b-af76-40d3843ae186",
//     "type": "circle",
//     "x1": 327.57,
//     "y1": 127.57,
//     "x2": 387.57,
//     "y2": 187.57,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "a5616bdf-6e92-4d2f-8257-40f2c63f1710",
//     "type": "circle",
//     "x1": 370,
//     "y1": 110,
//     "x2": 430,
//     "y2": 170,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "e3e7cdce-6871-4be9-8f94-c0857b58f1ec",
//     "type": "circle",
//     "x1": 412.43,
//     "y1": 127.57,
//     "x2": 472.43,
//     "y2": 187.57,
//     "strokeColor": "#FFA500",
//     "bgColor": "#FFD700"
//   },
//   {
//     "id": "a4851bfe-bc23-495d-8cb1-64e763e24210",
//     "type": "circle",
//     "x1": 380,
//     "y1": 180,
//     "x2": 420,
//     "y2": 220,
//     "strokeColor": "#8B4513",
//     "bgColor": "#FFFF00"
//   },
//   {
//     "id": "e368fa37-ae76-40c6-9331-49c7ff0694cf",
//     "type": "rect",
//     "x1": 395,
//     "y1": 220,
//     "x2": 405,
//     "y2": 350,
//     "strokeColor": "#228B22",
//     "bgColor": "#228B22"
//   },
//   {
//     "id": "7085fcf7-dc52-4c06-b4d1-8de17d31bb11",
//     "type": "circle",
//     "x1": 360,
//     "y1": 250,
//     "x2": 400,
//     "y2": 270,
//     "strokeColor": "#228B22",
//     "bgColor": "#228B22"
//   },
//   {
//     "id": "3d6e3d75-20f3-4269-8a11-e037c851798b",
//     "type": "circle",
//     "x1": 400,
//     "y1": 250,
//     "x2": 440,
//     "y2": 270,
//     "strokeColor": "#228B22",
//     "bgColor": "#228B22"
//   }
// ]

// shapes.forEach((shape, i) => {
//   setTimeout(() => {
//     shapesRef.current = [
//       ...shapesRef.current,
//       shape
//     ];
//     reDrawShapes();
//   }, i * 500); 
// });



  }


  return (
    <div className={`w-full max-w-md ${className} `}>
    <div className="relative">

    <input
        type="text"
        placeholder="Ex. Draw a house with a window..."
        className={`w-full py-4 pl-4 pr-16 border  bg-transparent rounded-2xl shadow-lg  dark:bg-gray-950 bg-white
          border-gradient-to-r from-pink-500 via-purple-600 to-indigo-700
           focus:outline-none ring-1 ${loading? "animate-pulse !ring-4":""} `}
           onChange={e => setInputValue(e.target.value)}
        
          ref={promptInput}
        onKeyDown={(event:any) => {

          if(event.code == "Enter") {
            drawWithAi()
          }
        }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Button
        variant='secondary'
       type="submit" className="text-gray-500 hover:text-gray-700 focus:outline-none !bg-transparent pl-0 pr-2 !translate-y-0 "
       loading={loading}
        onClick={drawWithAi}
        >
          
          <Sparkles className={inputValue ? "dark:text-indigo-100 text-indigo-500" : "text-gray-300 dark:text-gray-600"} />
          
        </Button>
      </div>
    </div>
  </div>
  )
}

export default PromptBar
