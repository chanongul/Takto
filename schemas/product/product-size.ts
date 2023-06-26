import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productSize',
  title: 'Product Size',
  type: 'document',
  initialValue: {
    extraPrice: 0
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extraPrice',
      title: 'Extra Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive().max(1000),
    }),
  ],
})
