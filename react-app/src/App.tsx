import { FC, lazy, LazyExoticComponent, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BasicLayout from './components/BasicLayout'

const LazyComponent = (Component: LazyExoticComponent<FC<any>>) => {
  return (
    <Suspense fallback="loading...">
      <Component />
    </Suspense>
  )
}

function App(props: { SentryRoutes: any }) {
  const { SentryRoutes } = props
  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
      <SentryRoutes>
        <Route path="" element={<BasicLayout />}>
          <Route index element={LazyComponent(lazy(() => import('src/views/Home')))} />
          <Route path="sign" element={LazyComponent(lazy(() => import('src/views/Sign')))} />
        </Route>
      </SentryRoutes>
    </BrowserRouter>
  )
}

export default App
