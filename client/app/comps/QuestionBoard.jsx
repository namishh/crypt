'use client'
import { useGameContext } from "../context/game"
import { useEffect, useState } from "react"
import PacmanLoader from "react-spinners/PacmanLoader"

import { toast } from "react-toastify"
export default function QuestionBoard() {
  const { data, url, setData } = useGameContext()
  const [updateQuestion, setUpdate] = useState(true)
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const getQuestion = async () => {
    setLoading(true)
    const req = await fetch(`${url}/api/getQuestion`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    let dataa = await req.json()
    if (dataa.status === 'ok') {
      dataa = dataa.data
      setQuestion(dataa.statement)
      setLoading(false)
    } else {
      alert(dataa.error)
    }
  }
  const checkAnswer = async (e) => {
    e.preventDefault()

    const response = await fetch(`${url}/api/checkAnswer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        answer
      }),
    })

    const dataa = await response.json()
    if (dataa.correct) {
      if (dataa.level > data.level) {
        setData({ ...data, level: Number(dataa.level) })
        setUpdate(!updateQuestion)
        toast("correct answer")
      } else {
        setData({ ...data, level: Number(dataa.level) })
        toast("you have completed the game!")
      }
    } else {
      toast("wrong answer")
    }
    setAnswer("")
  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = "/"
    }
    getQuestion()
  }, [data])
  return (
    <div className="flex w-full h-full justify-center items-center">

      {loading ? <PacmanLoader color="#7095db" size={20} /> : <form onSubmit={checkAnswer} className="w-full flex flex-col justify-between h-full">
        <div className="grow flex justify-center items-center text-2xl"><p>{question}</p></div>
        <div className="w-full">
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required
            className=" w-full rounded-md border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-[#222] placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-[#222]" />
        </div>
      </form>
      }
    </div>
  )
}
