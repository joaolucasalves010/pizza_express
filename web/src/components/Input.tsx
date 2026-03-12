import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<"input">

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
  return (
    <>
      <input 
        ref={ref} 
        {...rest} 
        className={cn("border p-2 rounded-xl focus:outline-orange-500 border-gray-400 w-full outline-none", className)}
      />
    </>
  )
})

Input.displayName = 'Input'

export default Input