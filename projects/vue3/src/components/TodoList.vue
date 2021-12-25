<template lang="pug">
.todo-list-container
  .todo-filter
    ul.tabs
      li(:class="{ 'is-active': tab === 'all' }")
        a(@click.prevent="tab = 'all'") All
      li(:class="{ 'is-active': tab === 'active' }")
        a(@click.prevent="tab = 'active'") Active
      li(:class="{ 'is-active': tab === 'completed' }")
        a(@click.prevent="tab = 'completed'") Completed
  .todo-main
    h2 {{ tab.charAt(0).toUpperCase() + tab.slice(1) }} todos
    .todo-empty(v-if="!validTodos.length")
      em Oops, no {{ tab === 'all' ? '' : tab }} todo. Add one!
    ul.todo-list
      todo-card(v-for="(todo, index) in validTodos" :key="index" :todo="todo")
  .todo-extra
    a.clear-completed(@click.prevent="clearCompletedTodos" v-if="!!todoList.find(i=>!!i.completedAt)")
      icon
        broom
      | Clear completed todos
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoCard from './TodoCard.vue'
import { Broom } from '@vicons/fa'
import { todoList, clearCompletedTodos } from '../utils/globalState'

const tab = ref<'all' | 'active' | 'completed'>('all')

const validTodos = computed(() => {
  return [
    ...(() => {
      switch (tab.value) {
        case 'active':
          return todoList.value.filter((todo) => !todo.completedAt)
        case 'completed':
          return todoList.value.filter((todo) => !!todo.completedAt)
        default:
          return todoList.value
      }
    })(),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})
</script>

<style scoped lang="sass">
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
          text-decoration: underline
  .clear-completed
    color: #888
    cursor: pointer
</style>
