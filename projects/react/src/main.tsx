import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.sass'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { todosReducer } from './reducers/todos'

export const globalStore = createStore(todosReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
