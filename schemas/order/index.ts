import { defineField, defineType } from 'sanity'
import { SanityClient } from 'sanity'
import orderStatuses from '../../content/order-statuses/en.json'
import {
  GET_CURRENT_ORDER_NUMBER_QUERY,
  GET_USER_ADDRESS_BY_USER_ID_FILTER,
} from '../../utils/queries'

function orderNumberFormatter(ordNum: number) {
  const str = String(ordNum)
  const zerosToAdd = 5 - str.length
  const paddedNumber = '0'.repeat(zerosToAdd) + str
  const date = new Date()
  return (
    'TO' +
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString() +
    date.getDate().toString() +
    paddedNumber
  )
}

async function getCurrentOrderNumber(client: SanityClient) {
  try {
    const result = await client.fetch(GET_CURRENT_ORDER_NUMBER_QUERY)
    if (result && result.orderNumber) {
      let res = parseInt((result.number as string).slice(4))
      return orderNumberFormatter(res + 1)
    } else {
      return orderNumberFormatter(1)
    }
  } catch (error) {
    console.error('Error fetching order numbers:', error)
    return orderNumberFormatter(1)
  }
}

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  initialValue: async (_, context) => {
    const { getClient } = context
    const client = getClient({ apiVersion: '2023-06-23' })
    const ordNum = await getCurrentOrderNumber(client)

    return {
      number: ordNum,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
  },
  preview: {
    select: {
      ordNum: 'number',
      fname: 'user.fname',
      lname: 'user.lname',
      date: 'createdAt',
    },
    prepare: ({ ordNum, fname, lname, date }) => {
      return {
        title: ordNum,
        subtitle: `${fname || ''} ${lname || 'Someone'}'s Order at ${new Date(
          date
        )
          .toISOString()
          .substring(0, 10)}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'number',
      title: 'Order Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'destination',
      type: 'reference',
      to: [{ type: 'userAddress' }],
      options: {
        filter: ({ document }) => {
          return {
            filter: GET_USER_ADDRESS_BY_USER_ID_FILTER,
            params: {
              userId: (document.user as any)._ref,
            },
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: orderStatuses,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
