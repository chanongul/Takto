import { ParsedContent } from '@nuxt/content/dist/runtime/types'

declare global {
  interface Category {
    title: string
    value: string
  }

  interface Categories extends ParsedContent, Array(Category) {}

  interface OrderStatus {
    title: string
    value: string
  }

  interface OrderStatuses extends ParsedContent, Array(OrderStatus) { }
  
  
}

export {}
