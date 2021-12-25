<script lang="ts">
  import type { Todo } from 'src/types/Todo'
  import { removeTodo, updateTodo } from '../utils/globalStorage'

  // props
  export let todo: Todo

  // icons set
  import Fa from 'svelte-fa'
  import {
    faCheckCircle,
    faPen,
    faTrash,
  } from '@fortawesome/free-solid-svg-icons'
  import { faCircle } from '@fortawesome/free-regular-svg-icons'
</script>

<li class={`todo-card ${!!todo.completedAt ? 'complated' : 'active'}`}>
  <div class="todo-check">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="todo-check-btn"
      on:click={() =>
        updateTodo({
          ...todo,
          completedAt: !!todo.completedAt ? '' : new Date().toISOString(),
        })}
      ><icon>
        {#if todo.completedAt}
          <Fa icon={faCheckCircle} />
        {:else}
          <Fa icon={faCircle} />
        {/if}</icon
      ></a
    >
  </div>
  <div class="todo-main">
    <div class="todo-title">{todo.title}</div>
    <div class="todo-content">{todo.content}</div>
    <div class="todo-time">
      <em class="todo-time-created"
        >Created at: {new Date(todo.createdAt).toLocaleString()}</em
      >{!!todo.completedAt ? '&nbsp;|&nbsp;' : ''}<em
        class="todo-time-complated"
        v-if="!!todo.completedAt"
        >Complated at: {new Date(todo.completedAt).toLocaleString()}</em
      >
    </div>
    <div class="todo-actions">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="edit-btn"><Fa icon={faPen} /></a>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="delete-btn" on:click={() => removeTodo(todo.uuid)}
        ><Fa icon={faTrash} color="darkred" /></a
      >
    </div>
  </div>
</li>

<style lang="sass">
.todo-card
  list-style: none
  width: 100%
  background-color: #fff
  padding: 1rem
  border-radius: 0.5rem
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1)
  display: flex
  gap: 1rem
  align-items: center

  .todo-main
    flex: 1

    .todo-title
      font-size: 1.25rem
      font-weight: bold
      margin: 0 0 1rem 0
    .todo-content
      // font-size: 1.2rem
      margin: 0 0 1rem 0
    .todo-time
      font-size: 0.8rem
      color: #ccc
    .todo-actions
      margin-top: 1rem
      display: flex
      gap: 1rem
      a
        cursor: pointer

  .todo-check
    a
      cursor: pointer
      font-size: 2rem
      display: block
      color: #ccc

  &.active
    .todo-check
      a:hover
        color: #aaa

  &.complated
    .todo-main
      .todo-title, .todo-content
        text-decoration: line-through
        color: #aaa
    .todo-check
      a
        color: #ff3e00
</style>
