import type { Todo } from 'src/types/Todo'
import { writable } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid'

export const TODOS = writable<Todo[]>([])

export const TODO_DEFAULTS: Todo = {
  uuid: '',
  title: '',
  content: '',
  createdAt: '',
  completedAt: '',
}
export const getTodoModel = (payload: Partial<Todo> = {}): Todo => {
  if (!payload.uuid) {
    payload.uuid = uuidv4()
  }
  if (!payload.createdAt) {
    payload.createdAt = new Date().toISOString()
  }

  return { ...TODO_DEFAULTS, ...payload }
}

// Init todoList from localStorage
;(() => {
  try {
    const data = JSON.parse(localStorage.getItem('todos') || '[]')
    TODOS.set(data)
  } catch (e) {
    console.warn('The local todos cache may be broken')
    TODOS.set([])
  }
})()

// Save todos to localStorage
TODOS.subscribe((val) => localStorage.setItem('todos', JSON.stringify(val)))

export const addTodo = ({
  title,
  content,
}: {
  title: string
  content?: string
}) => {
  TODOS.update((val) => [...val, getTodoModel({ title, content })])
  return TODOS
}

export const removeTodo = (uuid: string) => {
  TODOS.update((val) => val.filter((todo) => todo.uuid !== uuid))
  return TODOS
}

export const updateTodo = (payload: Partial<Todo> & { uuid: string }) => {
  TODOS.update((val) => {
    const index = val.findIndex((t) => t.uuid === payload.uuid)
    val[index] = getTodoModel(payload)
    return val
  })
  return TODOS
}

export const clearCompletedTodos = () => {
  TODOS.update((val) => val.filter((todo) => !todo.completedAt))
  return TODOS
}
