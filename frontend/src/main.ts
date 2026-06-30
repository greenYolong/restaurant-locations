// This file is the entry point of the Vue.js frontend application
// It initializes the Vue app, sets up routing, and mounts the app to the DOM

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/main.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
