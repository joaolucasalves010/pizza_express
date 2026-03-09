import { createContext, useState} from "react"
import type { ReactNode } from "react";

import type { User } from "@/types/User"

type UserContextType = {
  user: User | null,
  setUser: (user: User | null) => void; 
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}: {children: ReactNode}) => {  // Componentes renderizaveis do react

  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )


}