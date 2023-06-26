import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productAssets',
  title: 'Product Assets',
  type: 'document',
  preview: {
    select: {
      product: 'product.product.name',
      color: 'product.color.name',
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
      title: 'product',
      type: 'reference',
      to: [{ type: 'productVariant' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'model',
      title: '3D Model',
      type: 'file',
      options: {
        accept: '.glb,.gITF,.obj,.fbx',
      },
    }),
  ],
})
