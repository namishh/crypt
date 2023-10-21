'use client'

import Link from "next/link"
import { motion as m } from 'framer-motion';
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useGameContext } from "../context/game"
import Navbar from "../comps/Nav"
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const { data, url } = useGameContext()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = "/hunt"
    }
  })
  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch(`${url}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    })

    const data = await response.json()
    if (data.user) {
      localStorage.setItem('token', data.user)
      localStorage.setItem('username', data.details.username)
      console.log(data)
      window.location.href = '/hunt'
    } else {
      toast("No such user exists!")
    }
  }
  return <div className="h-screen flex flex-col items-center justify-center relative">
    <Navbar />
    <m.div initial={{ x: "100%" }} animate={{ x: "-100%" }} exit={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="fixed top-0 z-[111150] bg-primary left-0 h-full w-full"></m.div>
    <m.div initial={{ x: "100%" }} animate={{ x: "-100%" }} exit={{ opacity: 1 }} transition={{ delay: .25, duration: 1, ease: "easeOut" }} className="fixed top-0 z-[1111150] bg-neutral left-0 h-full w-full"></m.div>
    <div className="absolute flex flex-wrap w-full h-full bg-primary">
      {
        [...Array(48)].map((e, i) => <div className="w-1/12 h-1/4 bg-base-100 border-r-2 border-b-2 border-[#111] hover:bg-[#131c29] delay-100 transition-all" key={i}></div>)
      }
    </div>

    <m.div initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ opacity: 1 }} transition={{ delay: .3, duration: 1, ease: "easeOut" }} className="absolute h-screen w-screen flex justify-center items-center">
      <div className="relative flex items-center w-full justify-center">
        <div className="flex min-h-full relative z-[100] bg-base-100 rounded-md w-5/6 sm:w-3/4 md:w-[30rem] parent flex-col justify-center px-6 py-12 lg:px-8">
          <div className="absolute blur-lg -inset-1.5 opacity-30 -z-[100]   bg-gradient-to-r from-secondary to-accent rounded-lg"></div>
          <div className="absolute h-full w-full  z-[0] top-0 left-0  bg-base-100"></div>


          <div className="sm:mx-auto z-[10] sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 mb-8 w-auto"
              src="./logo.png"
              alt="Your Company"
            />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-4 z-[10] sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="block  w-full rounded-md border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-[#222] placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-[#222]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={pass} onChange={(e) => setPass(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-[#222] placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-[#222]"
                  />
                </div>
              </div>

              <div className="relative">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/signup" className="font-semibold leading-6 text-secondary hover:text-primary">
                Sign Up Today
              </Link>
            </p>
          </div>
        </div>
      </div>
    </m.div>
  </div>
}

export default LoginPage
