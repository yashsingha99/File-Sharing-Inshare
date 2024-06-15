import React, { useState } from 'react'
import Files from '../files/Files'

function ShareFile() {
    const[fileUrl, setFileUrl] = useState("")
  return (
    // <div className='h-full'>
      <Files/>
    // </div>
  )
}

export default ShareFile