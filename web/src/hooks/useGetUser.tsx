import api from "@/services/api"

import { UserContext } from "@/contexts/UserContext"
import { useContext, useState } from "react"

import { useNavigate } from "react-router-dom"

const useGetUser = () => {
  const { setUser } = useContext(UserContext)!
  const [isLoading, setIsLoading] = useState(false) 

  const navigate = useNavigate()

    async function getUser() {

      setIsLoading(true)

      try {
        const res = await api.get("/auth/me", {withCredentials: true})

        if (res.status === 200) {
          setUser(res.data)
        }
      } catch(err: any) {
        api.get("/logout", {withCredentials: true})
        setUser(null)
        navigate("/auth/signin")
    } finally {
      setIsLoading(false)
    }
  }

  return { getUser, isLoading }

}

export default useGetUser