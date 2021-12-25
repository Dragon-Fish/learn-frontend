<script lang="ts">
  import type { Todo } from '../types/Todo'

  let tab: 'all' | 'active' | 'completed' = 'all'
  import { clearCompletedTodos, TODOS } from '../utils/globalStorage'
  import TodoCard from './TodoCard.svelte'

  $: listShowed = <Todo[]>[
    ...(() => {
      switch (tab) {
        case 'all':
          return $TODOS
        case 'active':
          return $TODOS.filter((todo) => !todo.completedAt)
        case 'completed':
          return $TODOS.filter((todo) => !!todo.completedAt)
      }
    })(),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // icons set
  import Fa from 'svelte-fa'
  import { faBroom } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="todo-list-container">
  <div class="filter-container">
    <ul class="tabs">
      <li class={tab === 'all' ? 'is-active' : ''}>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:;"
          on:click={(e) => {
            e.preventDefault()
            tab = 'all'
          }}
        >
          All
        </a>
      </li>
      <li class={tab === 'active' ? 'is-active' : ''}>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:;"
          on:click={(e) => {
            e.preventDefault()
            tab = 'active'
          }}
        >
          Active
        </a>
      </li>
      <li class={tab === 'completed' ? 'is-active' : ''}>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:;"
          on:click={(e) => {
            e.preventDefault()
            tab = 'completed'
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  </div>
  <h2>{tab.charAt(0).toUpperCase() + tab.slice(1)} todos</h2>
  {#if !listShowed.length}
    <div class="todo-empty">
      <em>Oops, no {tab === 'all' ? '' : tab} todo. Add one!</em>
    </div>
  {/if}
  <ul class="todo-list">
    {#each listShowed as todo (todo.uuid)}
      <TodoCard {todo} />
    {/each}
  </ul>
  <div class="todo-extra">
    {#if $TODOS.find((todo) => !!todo.completedAt)}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="javascript:;"
        class="clear-completed"
        on:click={(e) => {
          e.preventDefault()
          clearCompletedTodos()
        }}><Fa icon={faBroom} /> Clear completed todos</a
      >
    {/if}
  </div>
</div>

<style lang="sass">
.todo-list-container
  .todo-list
    padding: 0
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 1rem
  .tabs
    list-style: none
    padding: 0
    display: flex
    gap: 1rem
    li
      a
        cursor: pointer
        color: #888
      &.is-active
        a
          color: #000
          font-weight: 800
          text-decoration: underline
  .clear-completed
    color: #888
    cursor: pointer
</style>
