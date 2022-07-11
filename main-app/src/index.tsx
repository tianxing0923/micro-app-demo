import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerMicroApps, start, initGlobalState, MicroAppStateActions } from 'qiankun'
import { makeMain, Hub } from '@sentry/browser'
import { withSentryReactRouterV6Routing } from '@sentry/react'
import { initReactSentryHub, initVueSentryHub } from './utils/sentry'
import App from './App'
import './utils/sensors'
import './index.less'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// 注册微应用
registerMicroApps([
  {
    name: 'react-demo',
    entry: 'http://localhost:3001',
    container: '#container',
    activeRule: '/react',
  },
  {
    name: 'vue2-demo',
    entry: 'http://localhost:3002',
    container: '#container',
    activeRule: '/vue2',
  },
  {
    name: 'vue3-demo',
    entry: 'http://localhost:3003',
    container: '#container',
    activeRule: '/vue3',
  },
])

// 全局 state
const state = {
  child: null,

  // vue sentry 所需
  vue: null,
  vueRouter: null,

  // react sentry 所需
  useEffect: null,
  useLocation: null,
  useNavigationType: null,
  createRoutesFromChildren: null,
  matchRoutes: null,
  withSentryReactRouterV6Routing,
}

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state)

// sentry hub
let vueHub: Hub | null = null
let reactHub: Hub | null = null
actions.onGlobalStateChange((state, prev) => {
  if (state.child === 'vue') {
    if (!vueHub) {
      vueHub = initVueSentryHub(state.vue, state.vueRouter)
    }
    makeMain(vueHub)
  } else if (state.child === 'react') {
    if (!reactHub) {
      reactHub = initReactSentryHub({
        useEffect: state.useEffect,
        useLocation: state.useLocation,
        useNavigationType: state.useNavigationType,
        createRoutesFromChildren: state.createRoutesFromChildren,
        matchRoutes: state.matchRoutes,
      })
    }
    makeMain(reactHub)
  }
})

// 启动应用
start()
