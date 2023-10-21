'use client'
import { useEffect, useState } from "react"
import Navbar from "./comps/Nav"
import { motion as m } from 'framer-motion';
import Link from "next/link";
import { DiscordLogo, GithubLogo, InstagramLogo } from "phosphor-react";
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
  const [user, setUser] = useState("")
  useEffect(() => {
    setUser(localStorage.getItem("token"))
  }, [])
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
        <section className="flex relative flex-col items-center">
          <div className="absolute left-4 w-72 h-72 w-96 h-96 bg-purple-300 rounded-full opacity-10 animate-blob blur-3xl animation-delay-2000 filter blur-xl"></div>
          <div className="absolute -right-4 w-96 h-96 w-60 h-96 bg-primary rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full opacity-[5%] filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="z-[40] flex max-w-xl flex-col items-center pb-16 pt-8 text-center lg:pb-32 lg:pt-16">
            <p className="mb-2 font-semibold text-primary md:mb-4 md:text-lg xl:text-xl">CYQUEST V9</p>

            <h1 className="mb-5 text-4xl font-bold text-white sm:text-3xl md:mb-8 md:text-5xl">Unravel, Decode, Triumph: Join Our 9th Cryptic Hunt</h1>

            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
              {user == undefined ?
                <Link href="/login" className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-zinc-900 bg-neutral md:text-base">Sign In To Start</Link> :
                <Link href="/hunt" className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-zinc-900 bg-neutral md:text-base">Continue The Hunt</Link>
              }

              <a href="https://github.com/chadcat7/" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Join Our Main Site</a>
            </div>
          </div>

          <div className="z-[40] flex items-center justify-center gap-4 lg:justify-start">
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-400 sm:text-base">Meet Us</span>
            <span className="h-px w-12 bg-gray-200"></span>

            <div className="flex gap-4">
              <a href="https://discord.com/users/715825910611443722" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <DiscordLogo size={22} weight="fill" />
              </a>
              <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <InstagramLogo size={22} weight="fill" />
              </a>
            </div>
          </div>
        </section >
      </div>
    </div>
  )
}
