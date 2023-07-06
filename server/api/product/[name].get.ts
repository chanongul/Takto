import {
  GET_PRODUCT_VARIANT_BY_ID_QUERY,
  GET_PRODUCT_VARIANTS_QUERY,
  GET_FILTERED_PRODUCT_VARIANTS_QUERY,
} from '../../../utils/queries'

export default defineEventHandler(async (event) => {
  const { fetch } = useSanity()
  const query = getQuery(event)
  try {
    if (event.context.params?.name === 'variant') {
      let variants
      if (query.id) {
        const result = await fetch<ProductVariant[]>(
          GET_PRODUCT_VARIANT_BY_ID_QUERY(query.id as string)
        )
        variants = calculateVariantsPrice(result)
        return variants[0]
      } else if (query.productId || query.color) {
        const result = await fetch<ProductVariant[]>(
          GET_FILTERED_PRODUCT_VARIANTS_QUERY({
            productId: query.productId as string,
            ...(query.color && {
              color: query.color as string,
            }),
          })
        )
        variants = calculateVariantsPrice(result)
        return variants
      } else {
        const result = await fetch<ProductVariant[]>(GET_PRODUCT_VARIANTS_QUERY)
        variants = calculateVariantsPrice(result)
        return variants
      }
    } else if (event.context.params?.name === 'collection') {
      return { hi: 'hi' }
    } else if (event.context.params?.name === 'color') {
      return { hi: 'hi' }
    } else if (event.context.params?.name === 'size') {
      return { hi: 'hi' }
    } else if (event.context.params?.name === 'assets') {
      return { hi: 'hi' }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage:
          'Please enter a valid name params. (variant | collection | color | size | assets)',
      })
    }
  } catch (error) {
    throw createError({
      statusCode: (error as ErrorWithCode).statusCode,
      statusMessage: (error as ErrorWithCode).message,
    })
  }
})

function calculateVariantsPrice(variants: ProductVariant[]) {
  return variants.map((val) => {
    return {
      ...val,
      price: val.product.price + val.color.extraPrice + val.size.extraPrice,
    }
  })
}
