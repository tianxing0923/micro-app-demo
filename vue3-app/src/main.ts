import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'
import store from './store'

let router: any = null
let app: any = null
function render(props: any) {
  const { container } = props

  router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3/' : '/'),
    routes,
  })

  app = createApp(App)
  app
    .use(store)
    .use(router)
    .mount(container ? container.querySelector('#app') : '#app')

  props.setGlobalState({ child: 'vue', vue: app, vueRouter: router })
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log('[vue3] vue3 app bootstraped')
}

export async function mount(props: any) {
  console.log('[vue3] props from main framework', props)
  render(props)
}
export async function unmount() {
  app.unmount()
  app = null
  router = null
}
