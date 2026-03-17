import { useState, createContext } from "react"
import type { ReactNode } from "react"

type CartContextType = {
  order: any[]
  setOrder: React.Dispatch<React.SetStateAction<any[]>>
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [order, setOrder] = useState<any[]>([])

  return (
    <CartContext.Provider value={{ order, setOrder }}>
      {children}
    </CartContext.Provider>
  )
}