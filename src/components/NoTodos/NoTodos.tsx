import React, { FC } from "react"
import { Title } from "./styles"

type PropsType = {
  text: string
}

export const NoTodos: FC<PropsType> = ({ text }) => {
  return (
    <>
      <Title>{text}</Title>
    </>
  )
}
