import {
  GET_FILTERED_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  GET_PRODUCTS_QUERY,
} from '../../../utils/queries'

export default defineEventHandler(async (event) => {
  const { fetch } = useSanity()
  const query = getQuery(event)
  try {
    if (query.id) {
      const products = await fetch<Product[]>(
        GET_PRODUCT_BY_ID_QUERY(query.id as string)
      )
      return products[0]
    } else if (
      query.category ||
      query.color ||
      query.size ||
      query.collection
    ) {
      return await fetch<Product[]>(
        GET_FILTERED_PRODUCTS_QUERY({
          category: query.category as string,
          color: query.color as string,
          size: query.size as string,
          collection: query.collection as string,
        })
      )
    } else {
      return await fetch<Product[]>(GET_PRODUCTS_QUERY)
    }
  } catch (error) {
    throw createError({
      statusCode: (error as ErrorWithCode).statusCode,
      statusMessage: (error as ErrorWithCode).message,
    })
  }
})
