import { Icon } from '@vicons/utils'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.component('Icon', Icon)

app.mount('#app')
