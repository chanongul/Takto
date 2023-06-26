import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productColor',
  title: 'Product Color',
  type: 'document',
  initialValue: {
    extraPrice: 0,
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameTH',
      title: 'Name in Thai',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extraPrice',
      title: 'Extra Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive().max(50000),
    }),
  ],
})
