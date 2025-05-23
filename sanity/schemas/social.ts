import {defineField, defineType} from 'sanity'
import TimeInput from '../components/TimeInput'

export const social = defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Select the city where the social event will be held',
      options: {
        list: [
          {title: 'Bergen', value: 'bergen'},
          {title: 'Drammen', value: 'drammen'},
          {title: 'Fredrikstad', value: 'fredrikstad'},
          {title: 'Hamar', value: 'hamar'},
          {title: 'Kristiansand', value: 'kristiansand'},
          {title: 'København', value: 'kobenhavn'},
          {title: 'Oslo', value: 'oslo'},
          {title: 'Stavanger', value: 'stavanger'},
          {title: 'Tromsø', value: 'tromso'},
          {title: 'Trondheim', value: 'trondheim'},
          {title: 'Digitalt', value: 'digitalt'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roomAddress',
      title: 'Room/Address',
      type: 'string',
      description: 'Specify the room or address for the event',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'datetime',
      description: 'Date and time of the social event',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      components: {
        input: TimeInput,
      },
      options: {
        baseDateString: '2025-06-05',
        displayMinHour: 19,
        displayMaxHour: 2,
        minuteInterval: 15,
        defaultDisplayHour: 19,
        defaultDisplayMinute: 0,
      } as any,
    }),
  ],
})