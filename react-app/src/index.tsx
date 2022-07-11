import './public-path'
import { StrictMode, useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom'
import App from './App'
import './index.less'

let root: Root

function render(props: any, withSentryReactRouterV6Routing: any) {
  const { container, setGlobalState } = props
  root = createRoot(container.querySelector('#app'))

  const SentryRoutes = withSentryReactRouterV6Routing(Routes)

  root.render(
    <StrictMode>
      <App SentryRoutes={SentryRoutes} />
    </StrictMode>
  )

  setGlobalState({ child: 'react', useEffect, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes })
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({}, {})
}

export async function bootstrap() {
  console.log('react app bootstraped')
}

export async function mount(props: any) {
  console.log('react props from main framework', props)

  let withSentryReactRouterV6Routing = null
  props.onGlobalStateChange((state: any) => {
    withSentryReactRouterV6Routing = state.withSentryReactRouterV6Routing
  }, true)

  if (withSentryReactRouterV6Routing) {
    render(props, withSentryReactRouterV6Routing)
  }
}

export async function unmount() {
  root.unmount()
}
