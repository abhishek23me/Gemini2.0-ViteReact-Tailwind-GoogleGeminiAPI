import React from 'react'
import Sidebar from './Sidebar'
import GMain from './GMain'

const GeminiHomepage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <GMain/>
    </div>
  )
}

export default GeminiHomepage;
