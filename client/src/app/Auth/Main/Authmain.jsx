import React, { useState } from 'react'
import { Signin } from '../Signin/Signin'
import { Login } from '../login/Login'


export const Authmain = ({mode1}) => {
    const [mode, setMode] = useState(true)  
  return (
    <div  style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"black"}}> 
      { 
        mode? <Signin setMode={setMode} mode={mode}/>: <Login setMode={setMode} /> 
      }
    </div>
  )
}
