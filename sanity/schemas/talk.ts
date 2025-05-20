import {defineField, defineType} from 'sanity'
import TimeInput from '../components/TimeInput'

export const talk = defineType({
  name: 'talk',
  title: 'Talk',
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
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the talk will be held',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'track',
      title: 'Track',
      type: 'string',
      options: {
        list: [
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio'
      },
      description: 'Which track the talk belongs to'
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'datetime',
      description: 'Time of the talk',
      initialValue: () => new Date('2025-06-05').toISOString(),
      components: {
        input: TimeInput
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      options: {
        list: [
          {title: '10 minutes', value: '10min'},
          {title: '20 minutes', value: '20min'},
          {title: '30 minutes', value: '30min'},
          {title: '45 minutes', value: '45min'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'forkunnskap',
      title: 'Required Knowledge Level',
      description: 'Knowledge prerequisite expected from participants',
      type: 'string',
      options: {
        list: [
          {title: 'Ingen grad', value: 'none'},
          {title: 'Liten grad', value: 'low'},
          {title: 'Middels grad', value: 'medium'},
          {title: 'Stor grad', value: 'high'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Topics this talk covers',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'email', type: 'string', title: 'Email' },
            {
              name: 'picture',
              title: 'Picture',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ],
      description: 'Speakers for this talk',
      validation: (rule) => rule.required().min(1),
    })
  ],
})
