import { defineField, defineType } from 'sanity'
import { COLOR_HEX_CODE_FORMAT } from './../../utils/regexen';

export default defineType({
  name: 'productColor',
  title: 'Product Color',
  type: 'document',
  initialValue: {
    extraPrice: 0,
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
      name: 'titleTH',
      title: 'Title in Thai',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extraPrice',
      title: 'Extra Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive().max(50000),
    }),
    defineField({
      name: 'code',
      title: 'Hex Code',
      type: 'string',
      validation: (Rule) => Rule.required().regex(COLOR_HEX_CODE_FORMAT).error('Enter color hex code only.'),
    }),
  ],
})
