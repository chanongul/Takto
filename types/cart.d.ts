declare global {
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
}

export {}