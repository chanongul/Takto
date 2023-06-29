declare global {
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
}

export {}
