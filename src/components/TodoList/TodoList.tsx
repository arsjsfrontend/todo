import { observer } from "mobx-react-lite"
import { CSSProperties, useState } from "react"
import { ActionsPanel } from "../ActionsPanel/ActionsPanel"
import { TextInput } from "../TextInput/TextInput"
import { Store, TodoObjectType } from "../../store/store"
import { NoTodos } from "../NoTodos/NoTodos"
import { SideBar } from "../SideBar/SideBar"
import { FixedSizeList as List } from "react-window"
import CenteredTabs from "../CenteredTabs/CenteredTabs"
import { TodoItem } from "./TodoItem/TodoItem"
import {
  Body,
  Container,
  PanelContainer,
  SideBarContainer,
  TodosContainer,
} from "./styles"
import { toJS } from "mobx"

export const TodoList = observer(() => {
  let panelVisibility = Store.findAnySelectedTodo()
  const todos = toJS(Store.todos)
  const sortedTodos = toJS(Store.sortedTodos || [])

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

  const deleteTodo = (index: number | undefined) => {
    Store.deleteTodo({ index })
  }
  const deleteSelectedTodos = () => {
    Store.deleteSelectedTodos()
  }

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number
    style: CSSProperties
    data: TodoObjectType[]
  }) => {
    return (
      <div
        style={{
          ...style,
          opacity: data[index]?.isComplete ? 0.3 : 1,
        }}
      >
        <TodoItem
          deleteTodo={deleteTodo}
          todo={data[index].todo}
          index={index}
          isComplete={data[index].isComplete}
          isSelected={data[index].isSelected}
          completeTodo={completeTodo}
          selectTodo={selectTodo}
        />
      </div>
    )
  }

  return (
    <>
      <Body>
        <CenteredTabs setIsSearch={setIsSearch} />
        <SideBarContainer>
          <SideBar />
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
              <List
                itemData={sortedTodos}
                width={800}
                height={500}
                itemCount={Store.sortedTodos.length}
                itemSize={140}
              >
                {Row}
              </List>
            ) : Store.sortedTodos === null ? (
              <NoTodos text={"Nothing found"} />
            ) : (
              <List
                itemData={todos}
                width={800}
                height={500}
                itemCount={Store.todos.length}
                itemSize={140}
              >
                {Row}
              </List>
            )
          ) : (
            <NoTodos text={"There is no Todos! Let's go rest!"} />
          )}
        </TodosContainer>
      </Body>
    </>
  )
})
