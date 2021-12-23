<template lang="pug">
#app-container
  header
    h1 
      img.logo(:src="Logo")
      | Learn Vue3: ToDo

  main
    add-todo
    todo-list

  footer
    p
      | A simple todo app built with Vue.js and Vite.
      |
      a(href="https://react-todo.wjghj.cn", target="_blank", rel="noopener noreferrer") See React ver. →
    p
      | Copyright &copy;
      |
      | {{ new Date().getFullYear() }}
      |
      a(href="https://github.com/Dragon-Fish/learn-vue-todo", target="_blank", rel="noopener noreferrer") Dragon-Fish

</template>

<script setup lang="ts">
import './styles/index.sass'
import Logo from './assets/logo.png'
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'
</script>

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

main
  flex: 1
  margin-bottom: 4rem

footer
  background-color: #eee
</style>
