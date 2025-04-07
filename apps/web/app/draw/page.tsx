"use client";
import React, { useState } from "react";
import ThemeSwitcher from "../../components/theme-switcher";
import ToolBar from "../../components/toolbar";
import PromptBar from "../../components/prompt-bar";
import ZoomTools from "../../components/zoom-tools";
import ColorBar from "../../components/color-bar";
import Canvas from "../../components/canvas";

const DrawPage = () => {


  return (
    <div className="p-4 relative h-screen overflow-hidden ">

      <Canvas  />

      <ToolBar className="absolute h-16 top-4 left-1/2 -translate-x-1/2" />

      <ThemeSwitcher className=" absolute right-8 h-16 " />

      <ColorBar
        
        className="absolute left-4 top-1/2 -translate-y-1/2 w-16"
      />

      <PromptBar className="absolute  bottom-4 left-1/2 -translate-x-1/2 h-16" />

      <ZoomTools className="absolute ldeft-8  bottom-4  h-16" />
    </div>
  );
};

export default DrawPage;
