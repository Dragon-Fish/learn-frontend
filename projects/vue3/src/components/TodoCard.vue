<template lang="pug">
li.todo-card(:class="!!todo.completedAt ? 'complated': 'active'")
  .todo-check
    a.todo-check-btn(@click="updateTodo({ ...todo, completedAt: !!todo.completedAt ? '' : new Date().toISOString()})")
      icon
        check-circle(v-if="!!todo.completedAt")
        circle-regular(v-else)
  .todo-main
    .todo-title {{ todo.title }}
    .todo-content {{ todo.content }}
    .todo-time
      em.todo-time-created Created at: {{ new Date(todo.createdAt).toLocaleString() }}
      | {{ !!todo.completedAt ? '&nbsp;|&nbsp;' : '' }}
      em.todo-time-complated(v-if="!!todo.completedAt") Complated at: {{ new Date(todo.completedAt).toLocaleString() }}
    .todo-actions
      a.edit-btn
        icon
          pen
      a.delete-btn(@click="removeTodo(todo.uuid)")
        icon(color="darkred")
          trash
</template>

<script setup lang="ts">
import {} from 'vue'
import { CheckCircle, CircleRegular, Pen, Trash } from '@vicons/fa'
import { updateTodo, removeTodo } from '../utils/globalState'
import type { Todo } from '../types/Todo'
const props = defineProps<{
  todo: Todo
}>()
</script>

<style scoped lang="sass">
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
        color: green
</style>
