export const GET_PRODUCTS_QUERY: string = `*[_type=='product']`

export function GET_PRODUCT_BY_ID_QUERY(id: string): string {
  return `*[_type=='product' && '${id}' in tags]`
}
