declare module '*.png'
declare module '*.jpg'

declare global {
  interface Window {
    chatwootSDK: any
    chatwootSettings: any
    $chatwoot: any
  }
}

export {}
