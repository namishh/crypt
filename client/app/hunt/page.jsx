'use client'
import { useEffect, useState } from "react"
import Navbar from "../comps/Nav"
import QuestionBoard from "../comps/QuestionBoard"
import LeaderBoard from "../comps/LeaderBoard"

export default function Home() {
  const quotes = ["Bro, even a broken clock is correct twice a day", "Stuck in a jam? Remember, even the best puzzles come with a 'berry' sweet solution", "Need a nudge? Don't be afraid to ask for help; we're all in the same 'boatload of clues'!", "Need a spark? Even light bulbs flicker before shining brightly. You're on the brink of brilliance"]

  function randomNoRepeats(array) {
    let copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      let index = Math.floor(Math.random() * copy.length);
      let item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }

  let choose = randomNoRepeats(quotes)
  const a = choose()
  const [quote, setQuote] = useState(quotes[0])
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = "/"
    }
  })
  return (
    <div className="min-h-screen p-24 w-screen flex justify-center items-center">
      <div className="absolute flex flex-wrap w-full h-full bg-primary">
        {
          [...Array(48)].map((e, i) => <div className="w-1/12 h-1/4 bg-base-100 border-r-2 border-b-2 border-[#111] delay-100 transition-all" key={i}></div>)
        }
      </div>
      <Navbar />
      <div className="flex-col-reverse md:flex-row flex gap-8">
        <div className="h-[32rem] z-[100] w-[25rem] bg-gradient-to-r from-rose-400 to-fuchsia-500 p-[2px] relative rounded-lg">
          <div className="bg-neutral z-[110] w-full h-full shadow-2xl rounded-lg p-8 md:p-8 ronded-xl">
            <LeaderBoard />
          </div>
        </div>
        <div className="flex flex-col gap-8 h-[32rem]">
          <div className="h-[24rem] md:w-[30rem] lg:w-[38rem] z-[100] bg-gradient-to-r from-fuchsia-500 to-indigo-500 shadow-2xl p-[2px] relative rounded-lg">
            <div className="bg-neutral z-[110] w-full h-full shadow-2xl rounded-lg p-4 sm:p-8 ronded-xl">
              <QuestionBoard />
            </div>
          </div>
          <div className="z-[100] bg-gradient-to-r from-fuchsia-500 grow to-indigo-500 shadow-2xl p-[2px] relative rounded-lg">
            <div onClick={() => setQuote(choose())} className="cursor-pointer bg-neutral grow lg:w-[38rem] md:w-[30rem] z-[110] w-full h-full shadow-2xl rounded-lg p-4 sm:p-4 ronded-xl flex justify-center items-center text-center">
              <p>{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
