'use client'
import { useEffect, useState } from "react"
import Navbar from "../comps/Nav"
import QuestionBoard from "../comps/QuestionBoard"
import LeaderBoard from "../comps/LeaderBoard"
import { CircleWavyQuestion, Crown } from "phosphor-react"
export default function Home() {
  const [mode, setMode] = useState(true)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = "/"
    }
  })
  return (
    <div className="min-h-screen h-screen w-screen flex justify-center items-center">
      <div className="absolute flex flex-wrap w-full h-full bg-primary">
        {
          [...Array(48)].map((e, i) => <div className="w-1/12 h-1/4 bg-base-100 border-r-2 border-b-2 border-[#111] delay-100 transition-all" key={i}></div>)
        }
      </div>
      <Navbar />
      <div className="h-[28rem] z-[100] md:w-1/2 w-5/6 lg:w-2/5 bg-primary p-2 relative rounded-lg">
        <div onClick={() => { setMode(!mode) }} className="absolute p-2 bg-[#222] rounded-3xl cursor-pointer right-[2rem] top-[2rem]">
          {mode ? <Crown size={32} weight="duotone" /> : <CircleWavyQuestion weight="duotone" size={32} />}
        </div>
        <div className="bg-neutral z-[110] w-full h-full shadow-2xl rounded-lg p-12 md:p-16 ronded-xl">
          {mode ? <QuestionBoard /> : <LeaderBoard />}
        </div>
        <div className="absolute -z-[1] blur-xl -inset-3.5 opacity-30   bg-gradient-to-r from-secondary to-accent rounded-lg"></div>
      </div>
    </div>
  )
}
