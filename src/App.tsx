import { reaction, toJS } from "mobx"
import { useEffect } from "react"
import "./App.css"
import { TodoList } from "./components/TodoList/TodoList"
import { Store, TodoObjectType } from "./store/store"

function App() {
  useEffect(() => {
    Store.todos = JSON.parse(localStorage.getItem("todos") || "[]")
    const dispose = reaction(
      () => toJS(Store.todos),
      (value: TodoObjectType[]) => {
        localStorage.setItem("todos", JSON.stringify(Store.todos))
      }
    )
    return () => {
      dispose()
    }
  }, [])

  return (
    <div className="App">
      <TodoList />
    </div>
  )
}

export default App
