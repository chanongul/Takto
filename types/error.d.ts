declare global {
  interface IError {
    statusCode: number
    message: string
  }
}

export {}
