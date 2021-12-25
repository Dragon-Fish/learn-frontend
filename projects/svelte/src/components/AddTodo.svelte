<script lang="ts">
  import { addTodo } from '../utils/globalStorage'

  let title = ''
  let content = ''

  let missingTitle = false

  const handleSubmit = () => {
    if (!title.trim()) {
      missingTitle = true
      return
    }
    missingTitle = false
    addTodo({
      title,
      content,
    })
    title = ''
    content = ''
  }

  // icons set
  import Fa from 'svelte-fa'
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
</script>

<form
  id="add-todo"
  on:submit|preventDefault={handleSubmit}
  on:change={() => (missingTitle = false)}
>
  <label>
    <strong
      >Title<sup>*</sup>
      {#if missingTitle}
        <em class="error"> Please at least enter a title </em>
      {/if}
    </strong>
    <input type="text" id="title" bind:value={title} />
  </label>
  <label>
    <strong>Content</strong>
    <textarea id="content" bind:value={content} />
  </label>
  <div class="submit-btn">
    <button type="submit"><Fa icon={faPlus} /></button>
  </div>
</form>

<style lang="sass">
#add-todo
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

  #content
    min-height: 6rem
    resize: vertical

  em.error
    color: red
</style>
