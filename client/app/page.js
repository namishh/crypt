'use client'
import { useEffect } from "react"
import Navbar from "./comps/Nav"

export default function Home() {
  useEffect(() => {

  }, [])
  return (
    <div className="h-screen bg-center bg-cover flex justify-center items-center" style={{ backgroundImage: "linear-gradient(to bottom, #000000ee 60%, #000000cc), url(/back.jpeg)" }}>
      <Navbar />
      <div className="flex flex-col">
        <p className="text-7xl md:text-[8rem] font-black ">CYQUEST <span className="fancy-text text-4xl md:text-[4rem]">IX</span></p>
      </div>
    </div>
  )
}
