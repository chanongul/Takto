declare global {
  type Product = {
    _id: string
    collections: ProductCollection[]
    name: string
    description: string
    slug: string
    name: string
    nameTH: string
    description: string
    descriptionTH: string
    categories: string[]
  }

  type ProductCollection = {
    _id: string
    name: string
    nameTH: string
    description: string
    descriptionTH: string
    date: Date
  }

  type ProductColor = {
    _id: string
    name: string
    nameTH: string
    extraPrice: number
  }

  type ProductSize = {
    _id: string
    name: string
    title: string
    extraPrice: number
  }

  type ProductVariant = {
    _id: string
    product: Product
    color: ProductColor
    size: ProductSize
    price: number
  }
}

export {}
