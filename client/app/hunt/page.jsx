'use client'
import { useGameContext } from "../context/game"
import { useEffect, useState } from "react"
import Navbar from "../comps/Nav"
import { toast } from "react-toastify"
export default function Home() {
  const { data, url } = useGameContext()
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const getQuestion = async () => {
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

    const data = await response.json()
    if (data.correct) {
      toast("correct answer")
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
    <div className="min-h-screen h-screen flex justify-center items-center">
      <Navbar />
      <form onSubmit={checkAnswer}>
        <div>{question}</div>
        <div>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
      </form>
    </div>
  )
}
