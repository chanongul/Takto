import { defineField, defineType } from 'sanity'
import { GET_PRODUCT_VARIANT_BY_ID_QUERY } from '../../utils/queries'

export default defineType({
  name: 'cartItem',
  title: 'Cart Item',
  type: 'document',
  initialValue: {
    quantity: 1,
  },
  preview: {
    select: {
      fname: 'cart.user.fname',
      lname: 'cart.user.lname',
    },
    prepare: ({ fname, lname }) => {
      return {
        title: `${fname} ${lname}'s Cart Item`,
      }
    },
  },
  fields: [
    defineField({
      name: 'cart',
      title: 'Cart',
      type: 'reference',
      to: [{ type: 'cart' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productVariant',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'productVariant' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) =>
        Rule.required().custom(async (quantity, context) => {
          if (quantity !== undefined && quantity < 1) {
            return 'Invalid quantity. Quantity cannot be less than 1.'
          }
          const { getClient } = context
          const client = getClient({ apiVersion: '2023-06-26' })
          const getProductById = await client.fetch(
            GET_PRODUCT_VARIANT_BY_ID_QUERY(
              (context.document?.productVariant as any)._ref
            )
          )
          const amountLeft = getProductById[0].amountLeft
          if (quantity !== undefined && quantity > amountLeft) {
            return `Invalid quantity. Quantity cannot be more than the amount have left (${amountLeft})`
          }
          return true
        }),
    }),
  ],
})
