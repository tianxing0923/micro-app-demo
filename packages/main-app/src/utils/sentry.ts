import { Breadcrumbs, defaultStackParser, defaultIntegrations, Hub, makeFetchTransport } from '@sentry/browser'
import { attachErrorHandler, BrowserClient, createTracingMixins, vueRouterInstrumentation } from '@sentry/vue'
import { reactRouterV6Instrumentation } from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { Operation } from '@sentry/vue/types/types'

export function initVueSentryHub(Vue: any, router: any) {
  const options = {
    dsn: '', // vue 应用 dsn 地址
    environment: 'dev',
    debug: false,
    stackParser: defaultStackParser,
    integrations: [
      ...defaultIntegrations,
      new Breadcrumbs({ console: false }),
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', /^\//],
      }),
    ],
    transport: makeFetchTransport,
    tracesSampleRate: 1.0,
  }
  const client = new BrowserClient(options)

  const hooks: Operation[] = ['activate', 'mount', 'update']
  const VueOptions = {
    Vue,
    attachProps: true,
    logErrors: false,
    hooks: hooks,
    timeout: 2000,
    trackComponents: false,
  }

  attachErrorHandler(Vue, VueOptions)

  if ('tracesSampleRate' in VueOptions || 'tracesSampler' in VueOptions) {
    Vue.mixin(
      createTracingMixins({
        ...VueOptions,
      })
    )
  }

  return new Hub(client)
}

export function initReactSentryHub({
  useEffect,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
}: {
  useEffect: any
  useLocation: any
  useNavigationType: any
  createRoutesFromChildren: any
  matchRoutes: any
}) {
  const client = new BrowserClient({
    dsn: '', // react 应用 dsn 地址
    environment: 'dev',
    debug: true,
    stackParser: defaultStackParser,
    integrations: [
      ...defaultIntegrations,
      new Breadcrumbs({ console: false }),
      new BrowserTracing({
        routingInstrumentation: reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
        tracingOrigins: ['localhost', /^\//],
      }),
    ],
    transport: makeFetchTransport,
    tracesSampleRate: 1.0,
  })

  return new Hub(client)
}
