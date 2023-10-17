'use client'

import { useGameContext } from "../context/game"
import { useEffect, useState } from "react"
import Navbar from "../comps/Nav"
export default function Home() {
  const {data, url} = useGameContext()
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const getQuestion = async() => {
    const req = await fetch(`${url}/api/getQuestion`, {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		let dataa = await req.json() 
		if (dataa.status === 'ok') {
      dataa = dataa.data
      console.log(dataa.statement)
      setQuestion(dataa.statement)
		} else {
			alert(dataa.error)
		}
  }
  const checkAnswer = () => {

  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = "/"
    }
   getQuestion()
  }, [data])
  return (
    <div className="min-h-screen h-screen flex justify-center items-center">
    <Navbar/>
    <div>{question}</div>
    </div>
  )
}
