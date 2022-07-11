import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)

let router: any = null
let app: any = null
function render (props: any) {
  const { container } = props

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue2/' : '/',
    mode: 'history',
    routes
  })

  props.setGlobalState({ child: 'vue', vue: Vue, vueRouter: router })

  app = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap () {
  console.log('[vue2] vue2 app bootstraped')
}

export async function mount (props: any) {
  console.log('[vue2] props from main framework', props)
  render(props)
}
export async function unmount () {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
  router = null
}
