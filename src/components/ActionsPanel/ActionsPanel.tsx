import { CheckboxButton } from "../base/Checkbox/CheckboxButton"
import { DeleteButton } from "../base/DeleteButton/DeleteButton"
import { Body } from "./styles"

type PropsType = {
  isCompletedTodos: boolean
  deleteSelectedTodos: () => void
  completeSelectedTodos: (value: boolean) => void
}

export const ActionsPanel = ({
  isCompletedTodos,
  deleteSelectedTodos,
  completeSelectedTodos,
}: PropsType) => {
  const onComplete = () => {
    completeSelectedTodos(!isCompletedTodos)
  }

  const onDelete = () => {
    deleteSelectedTodos()
  }

  return (
    <Body>
      <CheckboxButton onComplete={onComplete} isMultiple />
      <DeleteButton onDelete={onDelete} isMultiple />
    </Body>
  )
}
