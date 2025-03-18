import React from 'react'
import ThemeSwitcher from '../../components/theme-switcher'
import ToolBar from '../../components/toolbar'
import PromptBar from '../../components/prompt-bar'
import ZoomTools from '../../components/zoom-tools'

const DrawPage = () => {
  return (
    <div className='p-4 relative h-screen overflow-hidden'>

        <div className="flex w-full items-center justify-center relative" id="topbar">
       
          <ToolBar />
        <div className="absolute right-0">
        <ThemeSwitcher />
        </div>
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
