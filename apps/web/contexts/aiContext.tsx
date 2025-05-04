"use client";
import axios from "axios";
import { createContext, useContext, useRef } from "react";
import { useDraw } from "../hooks/useDraw";
import { Shape } from "./drawContext";

export type AiContextType = {
    promptInput:React.RefObject<HTMLInputElement | null>
    getAiReply:() => Promise<void> 
};

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export const AiContext = createContext<AiContextType | null>(null);

export const AiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

    const { reDrawShapes, shapesRef} = useDraw();

    const promptInput = useRef<HTMLInputElement | null>(null);




  const getAiReply = async () => {
    if(!promptInput.current) return;

    const systemMessage: Message = {
      role: "system",
      content: `
      You are a shape‑drawing assistant.  
      When you receive a user prompt, you MUST reply with a single JSON array of shape instructions—nothing else.  
      Each array entry must be an object with exactly these fields:
      
      • id (string): a unique identifier (UUID) for that shape  
      • type (string): one of "rect", "circle", or "line"  
      • x1, y1, x2, y2 (numbers): coordinates; for circles, x1/y1 = centerX–radius, x2/y2 = centerX+radius  
      • strokeColor (string): hex color for the outline, e.g. "#FF0000"  
      • bgColor (string): hex color for the fill, or "none" if no fill  
      
      Example valid response (array of shapes):  
   
      [
        {
          "id":"550e8400-e29b-41d4-a716-446655440000",
          "type":"rect",
          "x1":50,
          "y1":50,
          "x2":200,
          "y2":150,
          "strokeColor":"#FF0000",
          "bgColor":"none"
        }
      ]

      
      Only use the three types above. Do NOT include any markdown, explanations, or extra keys—just the JSON array.  
      `
    };

    const prompt: Message = {
      role: "user",
      content: promptInput.current.value || ""
    };

    console.log(process.env.NEXT_PUBLIC_OPENAI)
    const key = process.env.NEXT_PUBLIC_OPENAI;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [systemMessage, prompt],
          temperature: 0.3,
        //   top_p:0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
          }
        }
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from OpenAI");
      }

      console.log(response.data.choices[0].message.content)
      const shapes:Shape[] = JSON.parse(response.data.choices[0].message.content);
      console.log("Shapes received:", shapes);


      
      // TODO: Process the shapes and draw them

      shapes.forEach((shape, i) => {
        setTimeout(() => {
          shapesRef.current = [
            ...shapesRef.current,
            shape
          ];
          reDrawShapes();
        }, i * 500); 
      });
      
      
    } catch (err) {
      console.error("Error during chat completion:", err);
      // TODO: Show error notification to user
    }
  };

  return <AiContext.Provider value={{promptInput, getAiReply}}>{children}</AiContext.Provider>;
};
