declare global {
  type EntityRef = {
    _ref: string
  }

  type Cart = {
    _id: string
    user: User
  }

  type CartItem = {
    _id: string
    cart: Cart
    product: ProductVariant
    quantity: number
  }

  type Order = {
    number: string
    user: User
    product: ProductVariant
    _createdAt: Date
  }

  type OrderItem = {
    _id: string
    order: Order
    product: ProductVariant
    quantity: number
  }

  type OrderPayment = {
    _id: string
    order: Order
    amount: number
    _createdAt: Date
  }

  type Product = {
    _id: string
    collections: ProductCollection[]
    description: string
    slug: string
    title: string
    titleTH: string
    description: string
    descriptionTH: string
    categories: string[]
    colors: ProductColor[]
    sizes: ProductSize[]
    price: number
  }

  type ProductCollection = {
    _id: string
    title: string
    titleTH: string
    description: string
    descriptionTH: string
    _createdAt: Date
  }

  type ProductColor = {
    _id: string
    name: string
    title: string
    titleTH: string
    extraPrice: number
    code: string
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
    amountLeft: number
  }

  type User = {
    _id: string
    fname: string
    lname: string
    email: string
    lang: string
  }

  type UserAddress = {
    _id: string
    user: User
    name: string
    street: string
    detail?: string
    district?: string
    country: string
    zip: string
  }
}

export {}
