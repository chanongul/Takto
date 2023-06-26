import { defineField, defineType } from 'sanity'

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
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'quantity',
      title: 'quantity',
      type: 'number',
    }),
  ],
})
