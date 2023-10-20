import { useEffect, useState } from "react"
import PacmanLoader from "react-spinners/PacmanLoader"
import { useGameContext } from "../context/game"

export default function LeaderBoard() {
  const { data, url, setData } = useGameContext()
  const [leaderboard, setLeaderboard] = useState([])
  const [user, setUser] = useState({ username: "none", level: "", index: "" })
  const [loading, setLoading] = useState(true)
  const getLeaderboard = async () => {
    setLoading(true)
    const req = await fetch(`${url}/api/getlb`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    let dataa = await req.json()
    if (dataa.status === 'ok') {
      dataa = dataa.data
      setLeaderboard(dataa)
      const userone = dataa.filter(x => x.email === data.email)[0]
      const index = dataa.indexOf(userone)
      setUser({ ...userone, index })
      setLoading(false)
    } else {
      alert(dataa.error)
    }
  }
  useEffect(() => {
    getLeaderboard()
  }, [data])
  return <div className="flex flex-col items-center w-full h-full ">
    {loading ? <div className="justify-self-center h-full flex justify-center items-center">
      <PacmanLoader color="#7095db" size={35} />
    </div> :
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((i, j) => {
            return j <= 8 && <tr key={j} >
              <th>{j + 1}</th>
              <td>{i.username.toUpperCase() || "huh"}</td>
              <td>{i.level * 1000}</td>
            </tr>
          })}
          <tr >
            <th>{String(user.index + 1)}</th>
            <td>{user.username === undefined ? "LOADING PERSONAL STATS" : user.username.toUpperCase()}</td>
            <td>{String(user.level * 1000)}</td>
          </tr>

        </tbody>
      </table>}

  </div>
}
