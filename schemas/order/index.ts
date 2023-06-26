import { defineField, defineType } from 'sanity'
import { SanityClient } from 'sanity'
import orderStatuses from '../../content/jsons/order-statuses/en.json'

function orderNumberFormatter(ordNum: number) {
  const str = String(ordNum)
  const zerosToAdd = 10 - str.length
  const paddedNumber = '0'.repeat(zerosToAdd) + str
  return 'LUCA' + paddedNumber
}

async function getCurrentOrderNumber(client: SanityClient) {
  try {
    const result = await client.fetch(
      '*[_type == "order"] | order(number desc)[0]'
    )
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
    }),
    defineField({
      name: 'destination',
      title: 'destination',
      type: 'reference',
      to: [{ type: 'userAddress' }],
      options: {
        filter: '',
      },
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
    }),
  ],
})
