<template lang="pug">
.add-todo-container
  form.add-todo-form(@submit.prevent="handleAdd" @change="missingTitle = false")
    label
      strong
        | Title
        sup *
        em.error(v-if="missingTitle") &nbsp;Please at least input a title
      input#title(v-model="title")
    label
      strong Content
      textarea#content(v-model="content")
    .submit-btn
      button
        icon
          plus
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addTodo } from '../utils/globalState'
import { Plus } from '@vicons/fa'

const title = ref('')
const content = ref('')
const missingTitle = ref(false)

function handleAdd() {
  if (!title.value.trim()) {
    missingTitle.value = true
    return
  }
  addTodo({
    title: title.value,
    content: content.value,
  })
  title.value = ''
  content.value = ''
}
</script>

<style scoped lang="sass">
.add-todo-container
  background-color: #fff
  padding: 1rem
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1)

  .submit-btn
    text-align: center
    button
      padding: 1rem
      line-height: 1
      font-size: 1.5rem
      border-radius: 50%

  em.error
    color: red
</style>
