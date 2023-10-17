'use client'
import * as Icon from "phosphor-react";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Link from "next/link";
import { useGameContext } from "../context/game";
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const {loggedIn, setLoggedIn, data, setData, url} = useGameContext()
  console.log(url)
  const getData = async() => {
    const req = await fetch(`${url}/api/getData`, {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		let dataa = await req.json() 
		if (dataa.status === 'ok') {
      dataa = dataa.data
      setData({username: dataa.username, email: dataa.email, lastUpdate: dataa.lastUpdate, level: dataa.level})
		} else {
			alert(dataa.error)
		}

  }
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
			} else {
				getData()
        setLoggedIn(true)
			}
		}
	}, [])

  return (
    <>
    <div className="z-50 fixed top-0 bg-transparent backdrop-filter backdrop-blur-xl bg-opacity-40 p-4 md:p-8 lg:px-32 w-full md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <span className="flex cursor-pointer items-center" >
          <img className="rounded-full h-8 mr-4" src="./logo.png" alt="pro" />
          <span className="text-2xl cursor-pointer font-bold ">CyQuest</span>
        </span>
        <span onClick={toggle}>
          <i className={`text-3xl cursor-pointer block md:hidden text-lightpr dark:text-darkpr ph-light `}>
            <Icon.List size={32} weight={"light"}/>
      </i>
        </span>
      </div>
      <ul className={`md:flex md:items-center z-[-1] md:z-auto transition-all duration-400 md-static ms:absolute ${open ? '' : 'hidden'}`}>
    <li className="mx-0 my-6 md:my-0 md:mx-4" ><button className="text-xl dark:hover:text-darkpr hover:text-lightpr font-medium text-lightfg dark:text-darkfg"><Link href="/">Home</Link></button></li>
    { loggedIn && <li className="mx-0 my-6 md:my-0 md:mx-4"><button className="text-xl dark:hover:text-darkpr hover:text-lightpr font-medium text-lightfg dark:text-darkfg"><Link href="/hunt">Hunt</Link></button></li>}
    { loggedIn && <li className="mx-0 my-6 md:my-0 md:mx-4"><button className="text-xl dark:hover:text-darkpr hover:text-lightpr font-medium text-lightfg dark:text-darkfg" onClick={logout} >Log Out</button></li>}
    { !loggedIn && <li className="mx-0 my-6 md:my-0 md:mx-4"><button className="text-xl dark:hover:text-darkpr hover:text-lightpr font-medium text-lightfg dark:text-darkfg" ><Link href="/signup">Register</Link></button></li>}
    { !loggedIn && <li className="mx-0 my-6 md:my-0 md:mx-4"><button className="text-xl dark:hover:text-darkpr hover:text-lightpr font-medium text-lightfg dark:text-darkfg"><Link href="/login">Sign In</Link></button></li>}
      </ul>
    </div >
    </>
  );
}
