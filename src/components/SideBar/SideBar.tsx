import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react"
import { Store } from "../../store/store"
import { Body, Container, CounterContainer, Title } from "./styles"

type PropsType = {
  filterTodos: (value: boolean) => void
}

export const SideBar = ({ filterTodos }: PropsType) => {
  const [value, setValue] = useState("all")

  const doneTodos = Store.getDoneTodos()

  const reset = () => {
    Store.resetTodosFilter()
  }

  useEffect(() => {
    if (value === "all") {
      reset()
    } else {
      filterTodos(value === "done")
    }
  }, [value])

  const hanleChange = (e: React.ChangeEvent<unknown>, checked: boolean) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  return (
    <Body>
      <Container>
        <Title>Filters:</Title>
        <Box sx={{ display: "inline-block" }}>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All"
              onChange={hanleChange}
            />
            <FormControlLabel
              value="done"
              control={<Radio />}
              label="Done"
              disabled={!doneTodos.length}
              onChange={hanleChange}
            />
            <FormControlLabel
              value="undone"
              control={<Radio />}
              label="Undone"
              disabled={!Store.todos.length}
              onChange={hanleChange}
            />
            <CounterContainer>{`All/Done: ${Store.todos.length}/${doneTodos.length}`}</CounterContainer>
          </RadioGroup>
        </Box>
      </Container>
    </Body>
  )
}
