import {defineField, defineType} from 'sanity'
import TimeInput from '../components/TimeInput'
import type { TimeInputOptions } from '../components/TimeInput'; // Import the type for casting

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
      description: 'Where the social event will be held',
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
        baseDateString: '2025-06-05', // Assuming social events align with Bytefest 2025 date
        displayMinHour: 19, // 7 PM
        displayMaxHour: 2,  // 2 AM (implies crossing midnight)
        minuteInterval: 15,
        defaultDisplayHour: 19,
        defaultDisplayMinute: 0,
      } as any, // Use 'as any' to bypass strict DatetimeOptions check
    }),
  ],
})