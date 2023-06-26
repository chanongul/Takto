import { defineField, defineType } from 'sanity'

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
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
  ],
})
