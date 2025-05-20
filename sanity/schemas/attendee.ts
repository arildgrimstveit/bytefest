import {defineField, defineType} from 'sanity'

const buOptions = [
  {value: 'Applications', title: 'Applications'},
  {value: 'Digital Platform Services', title: 'Digital Platform Services'},
  {value: 'Advisory', title: 'Advisory'},
  {value: 'Andre', title: 'Andre'},
]

const participationLocationOptions = [
  {value: 'Bergen', title: 'Bergen'},
  {value: 'Drammen', title: 'Drammen'},
  {value: 'Fredrikstad', title: 'Fredrikstad'},
  {value: 'Hamar', title: 'Hamar'},
  {value: 'Kristiansand', title: 'Kristiansand'},
  {value: 'København', title: 'København'},
  {value: 'Oslo', title: 'Oslo'},
  {value: 'Stavanger', title: 'Stavanger'},
  {value: 'Tromsø', title: 'Tromsø'},
  {value: 'Trondheim', title: 'Trondheim'},
  {value: 'Digitalt', title: 'Digitalt'},
]

const wantsFoodOptions = [
  {value: 'yes', title: 'Ja'},
  {value: 'no', title: 'Nei'},
  {value: 'digital', title: 'Deltar digitalt'},
]

const attendsPartyOptions = [
  {value: 'yes', title: 'Ja, er med på det sosiale'},
  {value: 'no', title: 'Nei, kan dessverre ikke'},
]

export const attendee = defineType({
  name: 'attendee',
  title: 'Attendee',
  type: 'document',
  fields: [
    defineField({
      name: 'attendeeName',
      title: 'Name',
      type: 'string',
      readOnly: true, // Set from SSO, should not be edited manually
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attendeeEmail',
      title: 'Email',
      type: 'string',
      readOnly: true, // Set from SSO, should not be edited manually
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'bu',
      title: 'Business Unit',
      type: 'string',
      options: {
        list: buOptions,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'participationLocation',
      title: 'Participation Location',
      type: 'string',
      options: {
        list: participationLocationOptions,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wantsFood',
      title: 'Wants Food',
      type: 'string',
      options: {
        list: wantsFoodOptions,
        layout: 'radio',
        direction: 'vertical',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dietaryNeeds',
      title: 'Dietary Needs',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'attendsParty',
      title: 'Attends Party',
      type: 'string',
      options: {
        list: attendsPartyOptions,
        layout: 'radio',
        direction: 'vertical',
      },
      validation: (Rule) => Rule.required(),
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
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'favoriteTalks',
      title: 'Favorite Talks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'talk' }]
        }
      ],
      description: 'Talks this attendee has marked as favorites',
    }),
  ],
  preview: {
    select: {
      name: 'attendeeName',
      email: 'attendeeEmail',
      location: 'participationLocation',
    },
    prepare({name, email, location}) {
      return {
        title: name || 'No Name',
        subtitle: `${email}${location ? ' - ' + location : ''}`,
      }
    },
  },
})
