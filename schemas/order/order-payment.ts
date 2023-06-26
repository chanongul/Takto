import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'orderPayment',
  title: 'Order Payment',
  type: 'document',
  initialValue: {
    createdAt: new Date().toISOString(),
    amount: 0,
  },
  preview: {
    select: {
      ordNum: 'order.number',
    },
    prepare: ({ ordNum }) => {
      return {
        title: `${ordNum}'s Payment`,
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
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
  ],
})
