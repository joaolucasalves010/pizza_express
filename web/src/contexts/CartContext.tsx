import { useState, createContext, useEffect  } from "react"
import type { ReactNode } from "react"

type CartContextType = {
  order: any[]
  setOrder: React.Dispatch<React.SetStateAction<any[]>>,
  totalItems: number,
  totalValue: number
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [order, setOrder] = useState<any[]>([])
  const totalItems = order.reduce((acc) => acc + 1, 0)
  const totalValue = order.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    console.log(totalValue)
  }, [order])

  return (
    <CartContext.Provider value={{ order, setOrder, totalItems, totalValue }}>
      {children}
    </CartContext.Provider>
  )
}