import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productColor',
  title: 'Product Color',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'nameTH',
      title: 'Name in Thai',
      type: 'string',
    }),
    defineField({
      name: 'extraPrice',
      title: 'Extra Price',
      type: 'number',
    }),
  ],
})
