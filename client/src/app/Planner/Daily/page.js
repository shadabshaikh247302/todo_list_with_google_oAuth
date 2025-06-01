"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const SSRDefault = dynamic(() => import('../../component/Daliy/Main'), {
   ssr: false
})

const Page = () => {
  return (
    <div
      className='p-3 d-flex flex-column'
      style={{
        background: "linear-gradient(90deg, #BE3144, #1D1616)",
        minHeight: "100vh", // Ensures the component takes at least the full height of the viewport
      }}
    >
      <SSRDefault />
    </div>
  )
}

export default Page
