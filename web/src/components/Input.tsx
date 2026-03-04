import React from 'react'

type InputProps = React.ComponentProps<"input">

const Input = ({...rest}: InputProps) => {
  return (
    <>
      <input {...rest} className="border p-2 rounded-xl focus:outline-orange-500"/>
    </>
  )
}

export default Input