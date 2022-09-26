import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { ActionsPanel } from "../ActionsPanel/ActionsPanel"
import { TextInput } from "../TextInput/TextInput"
import { Store } from "../../store/store"
import { NoTodos } from "../NoTodos/NoTodos"
import { SideBar } from "../SideBar/SideBar"
import {
  Body,
  Container,
  PanelContainer,
  SideBarContainer,
  TodosContainer,
} from "./styles"
import CenteredTabs from "../CenteredTabs/CenteredTabs"
import { TodoItem } from "./TodoItem/TodoItem"

export const TodoList = observer(() => {
  let panelVisibility = Store.findAnySelectedTodo()

  const [isSearch, setIsSearch] = useState(false)

  const completeSelectedTodos = (value: boolean) => {
    Store.completeSelectedTodos(value)
  }
  const completeTodo = ({
    value,
    index,
  }: {
    value: boolean
    index: number | undefined
  }) => {
    Store.completeTodo({ value, index })
  }
  const selectTodo = ({ value, index }: { value: boolean; index: number }) => {
    Store.selectTodo({ value, index })
  }

  const filterTodos = (value: boolean) => {
    Store.filterTodos({ value })
  }
  const deleteTodo = (index: number | undefined) => {
    Store.deleteTodo({ index })
  }
  const deleteSelectedTodos = () => {
    Store.deleteSelectedTodos()
  }

  return (
    <>
      <Body>
        <CenteredTabs setIsSearch={setIsSearch} />
        <SideBarContainer>
          <SideBar filterTodos={filterTodos} />
        </SideBarContainer>
        <Container>
          <div>
            <TextInput isSearch={!isSearch} />
          </div>
        </Container>
        <PanelContainer
          style={{ visibility: panelVisibility ? "visible" : "hidden" }}
        >
          <ActionsPanel
            isCompletedTodos={Store.isCompletedTodos}
            completeSelectedTodos={completeSelectedTodos}
            deleteSelectedTodos={deleteSelectedTodos}
          />
        </PanelContainer>
        <TodosContainer>
          {Store.todos.length ? (
            Store.sortedTodos?.length ? (
              Store.sortedTodos.map((item, index) => (
                <div key={index} style={{ opacity: item.isComplete ? 0.3 : 1 }}>
                  <TodoItem
                    deleteTodo={deleteTodo}
                    todo={item.todo}
                    index={index}
                    isComplete={item.isComplete}
                    isSelected={item.isSelected}
                    completeTodo={completeTodo}
                    selectTodo={selectTodo}
                  />
                </div>
              ))
            ) : Store.sortedTodos === null ? (
              <NoTodos text={"Nothing found"} />
            ) : (
              Store.todos.map((item, index) => (
                <div key={index} style={{ opacity: item.isComplete ? 0.3 : 1 }}>
                  <TodoItem
                    deleteTodo={deleteTodo}
                    todo={item.todo}
                    index={index}
                    isComplete={item.isComplete}
                    isSelected={item.isSelected}
                    completeTodo={completeTodo}
                    selectTodo={selectTodo}
                  />
                </div>
              ))
            )
          ) : (
            <NoTodos text={"There is no Todos! Let's go rest!"} />
          )}
        </TodosContainer>
      </Body>
    </>
  )
})
