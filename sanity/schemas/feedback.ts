import {defineField, defineType} from 'sanity'

export const feedback = defineType({
  name: 'feedback',
  title: 'Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'feedbackCategory',
      title: 'Feedback Category',
      type: 'string',
      options: {
        list: [
          {title: 'General Event Feedback', value: 'general'},
          {title: 'Talk-Specific Feedback', value: 'talk'},
          {title: 'Speaker Experience Feedback', value: 'speaker'},
        ],
        layout: 'radio', // Or 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedTalk',
      title: 'Related Talk',
      type: 'reference',
      to: [{type: 'talk'}],
      hidden: ({document}) => document?.feedbackCategory !== 'talk',
      validation: (Rule) => Rule.custom((value, {document}) => {
        if (document?.feedbackCategory === 'talk' && !value) {
          return 'Please select the talk you are providing feedback for.'
        }
        return true
      })
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'feedbackCategory',
      talkTitle: 'relatedTalk.title',
      submitted: 'submittedAt',
    },
    prepare(selection) {
      const {title, category, talkTitle, submitted} = selection
      let previewSubtitle = submitted ? new Date(submitted).toLocaleString() : 'No submission date';
      if (category === 'talk' && talkTitle) {
        previewSubtitle = `Talk: ${talkTitle} - ${previewSubtitle}`;
      } else if (category === 'general') {
        previewSubtitle = `General - ${previewSubtitle}`;
      } else if (category === 'speaker') {
        previewSubtitle = `Speaker Experience - ${previewSubtitle}`;
      }

      return {
        title: title || 'Anonymous feedback',
        subtitle: previewSubtitle,
      }
    }
  }
}) 