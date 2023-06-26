import { defineField, defineType } from 'sanity'
import languages from '../../content/jsons/languages.json'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  initialValue: {
    lang: 'th',
  },
  preview: {
    select: {
      fname: 'fname',
      lname: 'lname',
    },
    prepare: ({ fname, lname }) => {
      return {
        title: `${fname} ${lname}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'fname',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lname',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^0[2-9]\d{8}$/, {
          name: 'Thai-phone-number',
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lang',
      title: 'Preferred Language',
      type: 'string',
      options: {
        list: languages,
      },
    }),
  ],
})
