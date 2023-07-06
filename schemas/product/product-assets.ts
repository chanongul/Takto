import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productAssets',
  title: 'Product Assets',
  type: 'document',
  preview: {
    select: {
      product: 'product.product.title',
      color: 'product.color.title',
      size: 'product.size.title',
    },
    prepare: ({ product, color, size }) => {
      return {
        title: `${product} : ${size}, ${color}'s Assets`,
      }
    },
  },
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'productVariant' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: '3D Model',
      type: 'file',
      options: {
        accept: '.glb,.gITF,.obj,.fbx',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
