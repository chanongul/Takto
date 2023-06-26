import { defineField, defineType } from 'sanity'
import { GET_PRODUCT_VARIANT_BY_ID_QUERY } from '../../utils/queries'

export default defineType({
  name: 'orderItem',
  title: 'Order Item',
  type: 'document',
  initialValue: {
    quantity: 1,
  },
  preview: {
    select: {
      ordNum: 'order.number',
    },
    prepare: ({ ordNum }) => {
      return {
        title: `${ordNum}'s Item`,
      }
    },
  },
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'reference',
      to: [{ type: 'order' }],
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
      title: 'quantity',
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
