import { IconButton } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { Store } from "../../store/store"
import { AddInput, AddTodoButton, SearchIconLoupe } from "./styles"

type PropsType = {
  isSearch?: boolean
}

export const TextInput: FC<PropsType> = ({ isSearch }) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (isSearch) {
      Store.sortedTodos = []
      setValue("")
    }
  }, [isSearch])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSearch) {
      Store.addTodo(value)
      setValue("")
    }
    if (!isSearch) {
      Store.findTodos(value)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <AddInput
        placeholder="Enter text"
        label="Todo"
        autoComplete="off"
        value={value}
        InputProps={
          !isSearch
            ? {
                endAdornment: (
                  <IconButton type="submit">
                    <SearchIconLoupe type="submit" />
                  </IconButton>
                ),
              }
            : {}
        }
        onChange={(e) => setValue(e.target.value)}
      />
      {isSearch && (
        <AddTodoButton variant="outlined" type="submit">
          Add Todo
        </AddTodoButton>
      )}
    </form>
  )
}
