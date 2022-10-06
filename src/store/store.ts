import { makeAutoObservable } from "mobx"

interface ITodoStore {
  todos: Array<TodoObjectType>
  sortedTodos: Array<TodoObjectType> | null
  isCompletedTodos: boolean
}

type CompleteTodoType = {
  value: boolean
  index: number | undefined
}
type SelectTodoType = {
  value: boolean
  index: number
}

export type TodoObjectType = {
  isComplete: boolean
  todo: string
  isSelected: boolean
}

type FilterTodosType = {
  value: boolean
}

type deleteTodoType = {
  index: number | undefined
}

class TodoStore implements ITodoStore {
  todos = [] as TodoObjectType[]
  sortedTodos: TodoObjectType[] | null = []
  isCompletedTodos = false

  constructor() {
    makeAutoObservable(this)
  }

  addTodo(value: string) {
    this.todos.push({ isComplete: false, todo: value, isSelected: false })
  }

  completeTodo({ value, index }: CompleteTodoType) {
    if (index === 0 || index) {
      this.todos[index].isComplete = value
    }
  }

  getDoneTodos() {
    return this.todos.filter((item) => item.isComplete)
  }

  completeSelectedTodos(value: boolean) {
    this.isCompletedTodos = value
    this.todos = this.todos.map(
      (item) =>
        ({
          todo: item.todo,
          isComplete: item.isSelected ? value : item.isComplete,
          isSelected: false,
        } as TodoObjectType)
    )
  }

  findTodos = (value: string) => {
    const result = this.todos.filter((item) => item.todo.match(value))
    if (result.length === 0) {
      this.sortedTodos = null
    } else {
      this.sortedTodos = result
    }
  }

  findAnySelectedTodo() {
    return this.todos.some((item) => item.isSelected)
  }

  filterTodos({ value }: FilterTodosType) {
    const result = this.todos.filter((item) => item.isComplete === value)
    this.sortedTodos = result
  }

  resetTodosFilter() {
    this.sortedTodos = []
  }

  selectTodo = ({ value, index }: SelectTodoType) => {
    this.todos[index].isSelected = value
  }

  deleteTodo({ index }: deleteTodoType) {
    if (index === 0 || index !== undefined) {
      this.todos.splice(index, 1)
    }
  }

  deleteSelectedTodos() {
    this.todos = this.todos.filter((item) => !item.isSelected)
  }
}

export const Store = new TodoStore()
