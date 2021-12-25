<script lang="ts">
  // styles
  import './styles/index.sass'

  // assets
  import Logo from './assets/svelte.png'

  // components
  import AddTodo from './components/AddTodo.svelte'
  import TodoList from './components/TodoList.svelte'
</script>

<div id="app-container">
  <header>
    <h1>
      <a href="/">
        <img src={Logo} alt="Svelte logo" class="logo" />
        Learn Svelte: ToDo</a
      >
    </h1>
  </header>

  <main>
    <article>
      <AddTodo />
      <TodoList />
    </article>
  </main>

  <footer>
    <p>
      A simple todo app built with Svelte and Vite. <a href="/"
        >Back to home →</a
      >
    </p>
    <p>
      Copyright &copy; {new Date().getFullYear()}{' '}
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

<style lang="sass">
#app-container
  display: flex
  flex-direction: column
  min-height: 100vh

header, main, footer
  padding: 0 5%

header
  h1
    .logo
      height: 1em
      vertical-align: middle
      margin: 0 0.5em 0 0
    a
      color: inherit
      text-decoration: none

main
  flex: 1
  margin-bottom: 4rem

footer
  background-color: #eee
</style>
