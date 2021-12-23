import { connect } from 'react-redux'
import InputAdd from './components/InputAdd'
import TodoList from './components/TodoList'
import { Todo } from './types/Todo'
import Logo from './logo.svg'

function App({ todos = [] }: { todos: Todo[] }) {
  return (
    <div
      id="app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          padding: '0 5%',
        }}
      >
        <h1>
          <img
            src={Logo}
            alt="logo"
            style={{
              height: '1em',
              verticalAlign: 'middle',
            }}
          />
          Learn React: ToDo
        </h1>
      </header>
      <main
        style={{
          padding: '0 5% 4rem 5%',
          flex: 1,
        }}
      >
        <article>
          <InputAdd></InputAdd>
          <TodoList></TodoList>
        </article>
      </main>
      <footer
        style={{
          padding: '0 5%',
          backgroundColor: '#eee',
        }}
      >
        <p>
          A simple todo app built with React.js, Redux and Vite.{' '}
          <a href="/"> Back to home →</a>
        </p>
        <p>
          &copy; Copyright (c) {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/Dragon-Fish/learn-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dragon-Fish
          </a>
        </p>
      </footer>
    </div>
  )
}

export default connect((state: Todo[]) => ({
  todos: state,
}))(App)
