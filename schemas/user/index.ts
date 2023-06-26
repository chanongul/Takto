import { defineField, defineType } from 'sanity'
import { GET_USERS_QUERY } from '../../utils/queries'
import languages from '../../content/languages.json'

const language: string = window.navigator.language

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  initialValue: {
    lang: language.slice(0, 2) === 'th' ? 'th' : 'en',
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
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) =>
        Rule.required().custom(async (email, context) => {
          const _id = context.document?._id.startsWith('drafts.')
            ? context.document?._id.slice(7)
            : context.document?._id
          const { getClient } = context
          const client = getClient({ apiVersion: '2023-06-26' })
          const getExistingEmails = await client.fetch(GET_USERS_QUERY)
          const emails = getExistingEmails.map(
            (val: { _id: string; email: string }) => {
              const val_id = val._id.startsWith('drafts.')
                ? val._id.slice(7)
                : val._id
              if (val_id !== _id) {
                return val.email
              }
            }
          )
          if (email !== undefined && emails.includes(email)) {
            return 'This email is already in use. Try another one.'
          }
          return true
        }),
    }),
    defineField({
      name: 'lang',
      title: 'Preferred Language',
      type: 'string',
      options: {
        list: languages,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
