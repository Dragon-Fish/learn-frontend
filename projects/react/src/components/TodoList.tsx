import { useState } from 'react'
import { connect } from 'react-redux'
import { globalStore } from '../main'
import { Todo } from '../types/Todo'
import TodoCard from './TodoCard'

const TodoList = () => {
  let [todos, setTodos] = useState<Todo[]>(globalStore.getState())
  let [tab, setTab] = useState<'all' | 'active' | 'completed'>('all')

  const renderTodo = (tab = 'all') => {
    let list = globalStore.getState()
    switch (tab) {
      case 'active':
        list = list.filter((item) => !item.completedAt)
        break
      case 'completed':
        list = list.filter((item) => !!item.completedAt)
        break
      default:
        list = list
    }
    setTodos(
      list.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    )
  }

  globalStore.subscribe(() => renderTodo(tab))

  return (
    <div className="todo-list-container">
      <div className="filter-container">
        <ul
          style={{
            display: 'flex',
            gap: '1rem',
            listStyle: 'none',
            padding: '0',
          }}
        >
          <li>
            <a
              href="javascript:;"
              onClick={(e) => {
                e.preventDefault()
                setTab('all')
                renderTodo('all')
              }}
              style={{
                color: tab === 'all' ? '#000' : '#aaa',
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              onClick={(e) => {
                e.preventDefault()
                setTab('active')
                renderTodo('active')
              }}
              style={{
                color: tab === 'active' ? '#000' : '#aaa',
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              onClick={(e) => {
                e.preventDefault()
                setTab('completed')
                renderTodo('completed')
              }}
              style={{
                color: tab === 'completed' ? '#000' : '#aaa',
              }}
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
      <h2>{tab.charAt(0).toUpperCase() + tab.slice(1)} todos</h2>
      {todos.length < 1 && (
        <div className="no-todo-container">
          <em>Oops, no {tab !== 'all' && tab} todo. Add one!</em>
        </div>
      )}
      <ul
        className="todo-list"
        style={{
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {todos.map((item, index) => (
          <TodoCard key={index} index={index} item={item} />
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="clear-todo-container">
          <a
            href="javascript:;"
            onClick={(e) => {
              e.preventDefault()
              globalStore.dispatch({
                type: 'clearTodos',
              })
            }}
          >
            Delete all todos
          </a>
        </div>
      )}
    </div>
  )
}

export default connect()(TodoList)
