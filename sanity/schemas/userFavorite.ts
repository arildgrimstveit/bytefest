import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'userFavorite',
  title: 'User Favorites',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Unique identifier for the user (can be device ID, session ID, or actual user ID)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'talk',
      title: 'Talk',
      type: 'reference',
      to: [{type: 'talk'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'talk.title',
      userId: 'userId',
    },
    prepare(selection) {
      const {title, userId} = selection
      return {
        title: title || 'Untitled Talk',
        subtitle: `Favorited by: ${userId}`,
      }
    },
  },
}) 