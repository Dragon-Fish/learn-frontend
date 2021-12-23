import { Todo } from '../types/Todo'
import { storage } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { combineReducers } from 'redux'

export const TODO_DEFAULTS: Todo = {
  uuid: '',
  title: '',
  content: '',
  createdAt: '',
  completedAt: '',
}

export const generateTodo = (todo: Partial<Todo>): Todo => {
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

export const addTodo = (
  state: Todo[] = [],
  todo: { title?: string; content: string }
) => {
  const data = [...state, generateTodo(todo)]
  storage.set('todos', data)
  return data
}

export const removeTodo = (state: Todo[] = [], uuid: string) => {
  const data = state.filter((todo) => todo.uuid !== uuid)
  storage.set('todos', data)
  return data
}

export const updateTodo = (
  state: Todo[] = [],
  todo: Partial<Todo> & { uuid: string }
) => {
  const data = state.map((i) =>
    i.uuid === todo.uuid ? generateTodo({ ...i, ...todo }) : i
  )
  storage.set('todos', data)
  return data
}

export const getTodos = (): Todo[] => {
  const data = storage.get('todos') || []
  return data
}

export const clearTodos = (): Todo[] => {
  storage.set('todos', [])
  return []
}

const reducersList = {
  addTodo,
  removeTodo,
  updateTodo,
  getTodos,
  clearTodos,
}

export const todosReducer = (
  state: Todo[] = [],
  action: {
    type: keyof typeof reducersList
    payload?: any
  }
) => {
  const fn: keyof typeof reducersList = Object.keys(reducersList).includes(
    action.type
  )
    ? action.type
    : 'getTodos'
  const reducer = reducersList[fn]
  const data = reducer(state, action.payload)
  console.log('Dispatching action: ', {
    type: fn,
    payload: action.payload,
    reducer,
    data,
  })
  return data
}
