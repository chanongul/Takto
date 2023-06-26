import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productSize',
  title: 'Product Size',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'extraPrice',
      title: 'Extra Price',
      type: 'number',
    }),
  ],
})
