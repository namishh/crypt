'use client'
import { useEffect } from "react"
import Navbar from "./comps/Nav"

export default function Home() {
  useEffect(() => {

  }, [])
  return (
    <div className="h-screen  flex justify-center items-center" >
      <Navbar />
      <div className="absolute flex flex-wrap w-full h-full bg-primary">
        {
          [...Array(48)].map((e, i) => <div className="w-1/12 h-1/4 bg-base-100 border-r-2 border-b-2 border-[#111] delay-100 transition-all" key={i}></div>)
        }
      </div>
      <div className="flex flex-col z-[20] text-center items-center gap-4">
        <p className="text-7xl md:text-[8rem] font-black ">CYQUEST <span className="fancy-text text-4xl md:text-[4rem]">IX</span></p>
      </div>
    </div>
  )
}
