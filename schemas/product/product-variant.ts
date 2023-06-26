import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  initialValue: {},
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
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{ type: 'productColor' }],
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'reference',
      to: [{ type: 'productSize' }],
    }),
    defineField({
      name: 'amountLeft',
      title: 'Amount Left in Stock',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
  ],
})
