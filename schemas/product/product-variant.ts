import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  initialValue: {
    amountLeft: 100,
  },
  preview: {
    select: {
      product: 'product.name',
      color: 'color.name',
      size: 'size.title',
    },
    prepare: ({ product, color, size }) => {
      return {
        title: `${product} : ${size}, ${color}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productColor',
      title: 'Color',
      type: 'reference',
      to: [{ type: 'productColor' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productSize',
      title: 'Size',
      type: 'reference',
      to: [{ type: 'productSize' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountLeft',
      title: 'Amount Left in Stock',
      type: 'number',
      validation: (Rule) => Rule.required().positive().max(50000),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
  ],
})
