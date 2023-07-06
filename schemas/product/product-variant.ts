import { SanityClient, defineField, defineType } from 'sanity'
import {
  GET_AVAILABLE_PRODUCT_COLORS_QUERY,
  GET_AVAILABLE_PRODUCT_SIZES_QUERY,
  GET_PRODUCT_VARIANTS_QUERY,
} from '../../utils/queries'

async function filterAvailableOptions(client: SanityClient, query: string) {
  return {
    filter: '_id in $colorIds',
    params: {
      colorIds: await client.fetch(query),
    },
  }
}

function areObjectsEqual(obj1: Object, obj2: Object) {
  const keys = Object.keys(obj1)
  if (keys.length !== Object.keys(obj2).length) {
    return false
  }
  for (let key of keys) {
    if (obj1[key as keyof Object] !== obj2[key as keyof Object]) {
      return false
    }
  }
  return true
}

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  initialValue: {
    amountLeft: 100,
  },
  preview: {
    select: {
      product: 'product.title',
      color: 'color.title',
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
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{ type: 'productColor' }],
      options: {
        filter: async ({ document, getClient }) =>
          await filterAvailableOptions(
            getClient({ apiVersion: '2023-06-23' }),
            GET_AVAILABLE_PRODUCT_COLORS_QUERY(
              (document.product as EntityRef)._ref
            )
          ),
      },
      validation: (Rule) =>
        Rule.required().custom(async (color, { document, getClient }) => {
          const client = getClient({ apiVersion: '2023-06-23' })
          const variants = await client.fetch<ProductVariant[]>(
            GET_PRODUCT_VARIANTS_QUERY
          )
          const selecteVariants = variants
            .filter((val) => {
              return (
                (val._id.startsWith('drafts.') ? val._id.slice(7) : val._id) !==
                (document?._id.startsWith('drafts.')
                  ? document?._id.slice(7)
                  : document?._id)
              )
            })
            .map((val) => {
              return { color: val.color._id, size: val.size._id }
            })
          const size = (document?.size as EntityRef)._ref
          const selecteVariant = {
            color: color?._ref,
            size: size,
          }
          for (let val of selecteVariants) {
            if (areObjectsEqual(val, selecteVariant)) {
              return 'This product variant has already been created.'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'reference',
      to: [{ type: 'productSize' }],
      options: {
        filter: async ({ document, getClient }) => {
          return await filterAvailableOptions(
            getClient({ apiVersion: '2023-06-23' }),
            GET_AVAILABLE_PRODUCT_SIZES_QUERY(
              (document.product as EntityRef)._ref
            )
          )
        },
      },
      validation: (Rule) =>
        Rule.required().custom(async (size, { document, getClient }) => {
          const client = getClient({ apiVersion: '2023-06-23' })
          const variants = await client.fetch<ProductVariant[]>(
            GET_PRODUCT_VARIANTS_QUERY
          )
          const selecteVariants = variants
            .filter((val) => {
              return (
                (val._id.startsWith('drafts.') ? val._id.slice(7) : val._id) !==
                (document?._id.startsWith('drafts.')
                  ? document?._id.slice(7)
                  : document?._id)
              )
            })
            .map((val) => {
              return { color: val.color._id, size: val.size._id }
            })
          const color = (document?.color as EntityRef)._ref
          const selecteVariant = {
            color: color,
            size: size?._ref,
          }
          for (let val of selecteVariants) {
            if (areObjectsEqual(val, selecteVariant)) {
              return 'This product variant has already been created.'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'amountLeft',
      title: 'Amount left in stock',
      type: 'number',
      validation: (Rule) => Rule.required().positive().max(50000),
    }),
  ],
})
