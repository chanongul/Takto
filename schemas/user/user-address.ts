import { defineField, defineType } from 'sanity'
import { ZIP_FORMAT } from '../../utils/regexen'
import countries from '../../content/countries/en.json'

export default defineType({
  name: 'userAddress',
  title: 'User Address',
  type: 'document',
  preview: {
    select: {
      fname: 'user.fname',
      lname: 'user.lname',
      nickname: 'name',
    },
    prepare: ({ fname, lname, nickname }) => {
      return {
        title: `${fname} ${lname}'s ${nickname}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Nickname',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: countries,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((zip, context) => {
          const country = context.document?.country
          const selectedCountry = countries.find((val) => val.value === country)
          const zipRegex = ZIP_FORMAT(selectedCountry?.value || '')
          if (!zipRegex.test(zip || '')) {
            return `Invalid ZIP code. Please provide a valid ZIP code for ${selectedCountry?.title}.`
          }
          return true
        }),
    }),
  ],
})
