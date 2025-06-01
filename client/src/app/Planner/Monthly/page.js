"use client"
import dynamic from 'next/dynamic'
import React from 'react'

// import { Main } from '../../component/Monthly/Main'
const NOSSR=dynamic(()=>import("../../component/Monthly/Main"),{ssr:false})
const page = () => {
  return (
    <div style={{height:"100%", background: "linear-gradient(90deg, #BE3144, #1D1616)"}}>
    <NOSSR/>
  </div>
  )
}

export default page