import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://e517fde0e3544c329d04da354bc10645@o4505059387768832.ingest.sentry.io/4505059435216896',
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  enabled: process.env.NODE_ENV === 'production',
})
