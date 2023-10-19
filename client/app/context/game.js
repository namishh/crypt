'use client'
import React, { createContext, useContext, useState } from "react"

const GameContext = createContext()

// create context provider
export const GameProvider = ({ children }) => {
  const [data, setData] = useState({username: "", email: "", lastUpdate: "", level:0})
  const [loggedIn, setLoggedIn] = useState(false)
  let url = ""
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
    url = "http://localhost:8080"
  } else {
    url = "https://cyquestbackend007.vercel.app"
  }
  return (
    <GameContext.Provider value={{  data, setData, loggedIn, setLoggedIn, url }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}


