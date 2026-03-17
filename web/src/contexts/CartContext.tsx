import { useState, createContext } from "react"
import type { ReactNode } from "react";

import type { Product } from "@/types/Product"

type CartContextType = {
  order:  Product[] | [],
  setOrder: (order: Product[] | []) => void;
} 

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children}: {children: ReactNode}) => {
  
  const [order, setOrder] = useState<Product[] | []>([])
  
  return (
    <CartContext.Provider value={{order, setOrder}}>
      {children}
    </CartContext.Provider>
  )
}