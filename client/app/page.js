'use client'
import { useEffect } from "react"
import Navbar from "./comps/Nav"
import { motion as m } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    }
  }
}

const item = {
  hidden: { y: '100%', opacity: 0 },
  show: { y: '0%', opacity: 1 }
}
export default function Home() {
  return (
    <div>
      <m.div initial={{ y: "0%", }} animate={{ y: "-100%" }} exit={{ opacity: 1 }} transition={{ delay: 2, duration: 1.5, ease: "easeOut" }} className="fixed bg-primary h-screen top-[0] left-[-50%] z-[10000000000] rounded-t-0">
        <m.div variants={container} className="h-[100vh] w-[200vw] left-[-50%] text-black flex flex-col gap-[1rem] text-left  items-center justify-center" initial="hidden" animate="show">
          <m.p variants={item} className="text-3xl md:text-6xl font-bold">silico battles</m.p>
          <m.p variants={item} className="text-3xl md:text-6xl font-bold">welcomes you to</m.p>
        </m.div>
      </m.div>

      <div className="h-screen  flex justify-center items-center" >
        <Navbar />
        <div className="absolute flex flex-wrap w-full h-full bg-primary">
          {
            [...Array(48)].map((e, i) => <div className="w-1/12 h-1/4 invisble md:visibile bg-base-100 border-r-2 border-b-2 border-[#111] delay-100 transition-all" key={i}></div>)
          }
        </div>
        <div className="flex flex-col z-[20] text-center items-center gap-4">
          <p className="text-7xl md:text-[8rem] font-black ">CYQUEST <span className="fancy-text text-4xl md:text-[4rem]">IX</span></p>
        </div>
      </div>
    </div>
  )
}
