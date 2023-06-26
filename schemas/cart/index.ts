import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cart',
  title: 'Cart',
  type: 'document',
  preview: {
    select: {
      fname: 'user.fname',
      lname: 'user.lname',
    },
    prepare: ({ fname, lname }) => {
      return {
        title: `${fname} ${lname}'s Cart`,
      }
    },
  },
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
