import {defineField, defineType} from 'sanity'

// Define options for choice fields based on frontend forms
const buOptions = [
  {value: 'Applications', title: 'Applications'},
  {value: 'Digital Platform Services', title: 'Digital Platform Services'},
  {value: 'Advisory', title: 'Advisory'},
  // Add other BUs from your frontend if needed
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

const willPresentOptions = [
  {value: 'yes', title: 'Ja'},
  {value: 'no', title: 'Nei'},
]

export const attendee = defineType({
  name: 'attendee',
  title: 'Attendee / Påmeldt',
  type: 'document',
  fields: [
    defineField({
      name: 'attendeeName',
      title: 'Name / Navn',
      type: 'string',
      readOnly: true, // Set from SSO, should not be edited manually
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attendeeEmail',
      title: 'Email / E-post',
      type: 'string',
      readOnly: true, // Set from SSO, should not be edited manually
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'bu',
      title: 'Business Unit / BU',
      type: 'string',
      options: {
        list: buOptions,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'participationLocation',
      title: 'Participation Location / Deltar fra',
      type: 'string',
      options: {
        list: participationLocationOptions,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wantsFood',
      title: 'Wants Food / Ønsker mat',
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
      title: 'Dietary Needs / Dietthensyn',
      type: 'array',
      of: [{type: 'string'}],
      // Optional: Define specific allowed dietary needs as a list for consistency?
      // options: {
      //     list: [
      //         { value: 'Vegetarisk', title: 'Vegetarisk' },
      //         { value: 'Vegansk', title: 'Vegansk' },
      //         { value: 'Glutenfritt', title: 'Glutenfritt' },
      //         { value: 'Melkefritt', title: 'Melkefritt' },
      //         { value: 'Laktosefritt', title: 'Laktosefritt' },
      //         // How to handle 'Annet: ...' here needs consideration
      //     ]
      // }
    }),
    defineField({
      name: 'attendsParty',
      title: 'Attends Party / Deltar på fest',
      type: 'string',
      options: {
        list: attendsPartyOptions,
        layout: 'radio',
        direction: 'vertical',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'willPresent',
      title: 'Will Present / Skal holde foredrag',
      type: 'string',
      options: {
        list: willPresentOptions,
        layout: 'radio',
        direction: 'vertical',
      },
      validation: (Rule) => Rule.required(),
    }),
    // Optional: Add a timestamp for when the registration occurred
    // defineField({
    //     name: 'registeredAt',
    //     title: 'Registered At',
    //     type: 'datetime',
    //     readOnly: true,
    //     initialValue: () => new Date().toISOString(),
    // }),
  ],
  // Customize the preview in the studio
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
