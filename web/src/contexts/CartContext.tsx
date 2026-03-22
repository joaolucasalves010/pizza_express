import { useState, createContext, useEffect  } from "react"
import type { ReactNode } from "react"

type CartContextType = {
  order: any[]
  setOrder: React.Dispatch<React.SetStateAction<any[]>>,
  totalItems: number
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [order, setOrder] = useState<any[]>([])
  let totalItems = 0
  for (let i = 0; i < order.length; i++) {
    totalItems += 1
  }

  return (
    <CartContext.Provider value={{ order, setOrder, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}