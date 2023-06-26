export const GET_PRODUCTS_QUERY: string = '*[_type=="product"]'

export const GET_USERS_QUERY: string = '*[_type=="user"]'

export const GET_CURRENT_ORDER_NUMBER_QUERY: string =
  '*[_type=="order"] | order(number desc)[0]'

export const GET_USER_ADDRESS_BY_USER_ID_FILTER: string =
  '_type=="userAddress" && references($userId)'

export function GET_PRODUCT_VARIANT_BY_ID_QUERY(id: string): string {
  return `*[_type=="productVariant" && _id=="${id}"]`
}