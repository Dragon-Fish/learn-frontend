import { ref, watch } from 'vue'
import { Todo } from '../types/Todo'
import { v4 as uuidv4 } from 'uuid'

export const todoList = ref<Todo[]>([])

export const TODO_DEFAULTS: Todo = {
  uuid: '',
  title: '',
  content: '',
  createdAt: '',
  completedAt: '',
}

export const getTodoModel = (todo: Partial<Todo>): Todo => {
  if (!todo.createdAt) {
    todo.createdAt = new Date().toISOString()
  }
  if (!todo.uuid) {
    todo.uuid = uuidv4()
  }
  return {
    ...TODO_DEFAULTS,
    ...todo,
  }
}

// Init todoList from localStorage
;(() => {
  const data = localStorage.getItem('todos')
  if (data) {
    todoList.value = JSON.parse(data)
  }
})()
// Save todos to localStorage
watch([todoList, todoList.value], () => {
  console.log('Update todoList')
  localStorage.setItem('todos', JSON.stringify(todoList.value))
})

export const addTodo = (todo: { title: string; content?: string }) => {
  todoList.value.push(getTodoModel(todo))
  return todoList.value
}

export const removeTodo = (uuid: string) => {
  todoList.value = todoList.value.filter((todo) => todo.uuid !== uuid)
  return todoList.value
}

export const updateTodo = (todo: Partial<Todo> & { uuid: string }) => {
  const index = todoList.value.findIndex((t) => t.uuid === todo.uuid)
  todoList.value[index] = getTodoModel(todo)
  return todoList.value
}

export const clearCompletedTodos = () => {
  todoList.value = todoList.value.filter((todo) => !todo.completedAt)
  return todoList.value
}
