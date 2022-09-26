import { FC } from "react"
import { CheckboxButton } from "../../base/Checkbox/CheckboxButton"
import { DeleteButton } from "../../base/DeleteButton/DeleteButton"
import { DelContainer, Item, TextContainer } from "./styles"

type PropsType = {
  todo: string
  index: number
  isComplete: boolean
  isSelected: boolean
  deleteTodo: (index: number | undefined) => void
  completeTodo: ({
    value,
    index,
  }: {
    value: boolean
    index: number | undefined
  }) => void
  selectTodo: ({ value, index }: { value: boolean; index: number }) => void
}
export const TodoItem: FC<PropsType> = ({
  todo,
  index,
  isComplete,
  isSelected,
  deleteTodo,
  completeTodo,
  selectTodo,
}) => {
  const handleClick = () => {
    selectTodo({ index, value: !isSelected })
  }

  const onComplete = (isComplete: boolean) => {
    completeTodo({ value: isComplete, index })
  }

  const onDelete = () => {
    deleteTodo(index)
  }

  return (
    <Item
      style={{ background: isSelected ? "#7ad2e5" : "" }}
      onClick={handleClick}
    >
      <TextContainer>{todo}</TextContainer>
      <DelContainer onClick={(e) => e.stopPropagation()}>
        <CheckboxButton isComplete={isComplete} onComplete={onComplete} />
        <DeleteButton onDelete={onDelete} />
      </DelContainer>
    </Item>
  )
}
