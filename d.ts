declare module '*.png'
declare module '*.jpg'

declare global {
  interface Window {
    Intercom: any
    chatwootSDK: any
    chatwootSettings: any
    $chatwoot: any
  }
}

export {}
