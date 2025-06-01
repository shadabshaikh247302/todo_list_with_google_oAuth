"use client"
import React, { useContext, useEffect } from 'react'
import { Login } from './Login'
import { useRouter } from 'next/navigation'
import { Authcontext } from '../../Context/Authcontext'
import toast from 'react-hot-toast'

const page = () => {
    const {AuthData} = useContext(Authcontext)
    // console.log(AuthData)
    // console.log(AuthData)
    const router = useRouter()
    useEffect(()=>{
        if(AuthData.token){
          router.push('/')
        toast.success("You are already logged in!")
      }
    },[])
  return (
    <div  
    style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',border:'0px solid black',background: "linear-gradient(90deg, #BE3144, #1D1616)"}}
    >
      <Login/>
    </div>
  )
}

export default page