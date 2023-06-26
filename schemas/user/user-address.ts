import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'userAddress',
  title: 'User Address',
  type: 'document',
  initialValue: {},
  preview: {
    select: {
      fname: 'user.fname',
      lname: 'user.lname',
    },
    prepare: ({ fname, lname }) => {
      return {
        title: `${fname} ${lname}'s Address`,
      }
    },
  },
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
    }),
    defineField({
      name: 'detail',
      title: 'Detail',
      type: 'string',
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
  ],
})
