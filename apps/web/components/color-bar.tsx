import React, { useState } from "react";
import useTools from "../hooks/useTools";

const ColorBar = ({ className }: { className?: string }) => {
  const { strokeColorSelected, setStrokeColorSelected, strokeColors, bgColors, bgColorRef } =
    useTools();

  const [bgColorSelected, setBgColorSelected] = useState<string>(
    bgColorRef.current
  );

  return (
    <div
      className={` border  dark:bg-gray-950 rounded-2xl p-3 flex-col px-4  flex gap-2 py-4 ${className}`}
    >
      <p className="text-[12px] ">Stroke</p>
      <div className="flex  gap-2 p-0" id="stroke">
        {strokeColors.map((color, index) => (
          <div
            key={index}
            className={`rounded-lg h-6 w-6 cursor-pointer hover:scale-110 duration-200 
             ${strokeColorSelected == color ? "shadow-lg outline-2 outline outline-blue-500 p-0" : ""}`}
            onClick={() => {
              setStrokeColorSelected(color);
            }}
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>

      <p className="text-[12px] mt-4">Background</p>
      <div className="flex  gap-2 p-0" id="stroke">
        <div
          className={`relative rounded-lg h-6 w-6 cursor-pointer hover:scale-110 duration-200 border-2 border-red-500 ${
            bgColorSelected === "none"
              ? "shadow-lg outline-2 outline outline-blue-500"
              : ""
          }`}
          onClick={() => {
            bgColorRef.current = "none";
            setBgColorSelected("none");
          }}
        >
          {/* This inner div creates a red diagonal stripe over a transparent background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 45%, red 45%, red 55%, transparent 55%)",
            }}
          ></div>
        </div>

        {bgColors.map((color, index) => (
          <div
            key={index}
            className={`rounded-lg h-6 w-6 cursor-pointer hover:scale-110 duration-200 
             ${bgColorSelected == color ? "shadow-lg outline-2 outline outline-blue-500 p-0" : ""}`}
            onClick={() => {
              console.log("selecting bg color");
              bgColorRef.current = color;
              setBgColorSelected(color);
            }}
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorBar;
