import React from 'react'
import ThemeSwitcher from '../../components/theme-switcher'
import ToolBar from '../../components/toolbar'
import PromptBar from '../../components/prompt-bar'
import ZoomTools from '../../components/zoom-tools'
import ColorBar from '../../components/color-bar'
import Canvas from '../../components/canvas'

const DrawPage = () => {
  return (
    <div className='p-4 relative h-screen overflow-hidden '>

      <Canvas  />

        <div className="flex w-full items-center justify-center absolute top-4  " id="topbar">
       
          <ToolBar />
        <div className="absolute right-8 h-full">
        <ThemeSwitcher />
        </div>
        </div>

        <div className="absolute left-4 top-1/2 -translate-y-1/2" id="colorbar">

          <ColorBar />
        </div>


        <div className="flex absolute bottom-0 justify-center items-center left-0 right-0 p-4" id='promptbar'>
          <PromptBar />
        <div className="absolute left-4">
        <ZoomTools />
        </div>

        </div>
    
      
    </div>
  )
}

export default DrawPage
