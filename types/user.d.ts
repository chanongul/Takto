declare global {
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
