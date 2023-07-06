import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productCollection',
  title: 'Product Collection',
  type: 'document',
  initialValue: {
    date: new Date().toISOString().slice(0, 10),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'slug',
      title: 'Name',
      type: 'slug',
      options: {
        source: 'title',
      },
      hidden: ({ document }) => !document?.title,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionTH',
      title: 'Description in Thai',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      // validation: (Rule) => Rule.required(),
    }),
  ],
})
