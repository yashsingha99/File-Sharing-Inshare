import React, { useState } from 'react'
import Files from '../files/Files'

function ShareFile() {
    const[fileUrl, setFileUrl] = useState("")
  return (
      <Files/>
  )
}

export default ShareFile