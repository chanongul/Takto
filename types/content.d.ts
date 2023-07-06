import { ParsedContent } from '@nuxt/content/dist/runtime/types'

declare global {
  type JsonContent = {
    title: string
    value: string
  }

  type JsonContents = ParsedContent & Array<JsonContent>
}

export {}
