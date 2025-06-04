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
      name: 'attendee',
      title: 'Attendee',
      type: 'reference',
      to: [{type: 'attendee'}],
      hidden: ({document}) => false,
    }),
    defineField({
      name: 'participationLocation',
      title: 'Participation Location',
      type: 'string',
      options: {
        list: [
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
        ],
      },
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      hidden: ({document}) => document?.feedbackCategory === 'general' || document?.feedbackCategory === 'talk',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().warning('Please enter a valid email address'),
      hidden: ({document}) => document?.feedbackCategory === 'general' || document?.feedbackCategory === 'talk',
    }),
    defineField({
      name: 'message',
      title: 'Har du tilbakemeldinger til foredragsholderen?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory === 'general',
    }),
    defineField({
      name: 'rating',
      title: 'Hvor godt likte du foredraget?',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory === 'general',
    }),
    // General event feedback fields for general category
    // Digital participation fields
    defineField({
      name: 'digitalParticipationRating',
      title: 'Hvordan opplevde du den digitale deltakelsen?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation !== 'Digitalt',
    }),
    defineField({
      name: 'digitalImplementationFeedback',
      title: 'Har du kommentarer til den digitale gjennomføringen?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation !== 'Digitalt',
    }),
    defineField({
      name: 'audioQualityRating',
      title: 'Hvordan opplevde du kvaliteten på lyden på strømmingen? (Digitalt)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation !== 'Digitalt',
    }),
    defineField({
      name: 'videoQualityRating',
      title: 'Hvordan opplevde du kvaliteten på bildet på strømmingen? (Digitalt)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation !== 'Digitalt',
    }),
    defineField({
      name: 'streamingCombinationFeedback',
      title: 'Har du kommentarer om kombinasjonen av strømming og fysiske foredrag? (Digitalt)',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation !== 'Digitalt',
    }),
    // Physical participation fields
    defineField({
      name: 'praktiskOfficeRating',
      title: 'Hvordan opplevde du den praktiske gjennomføringen på ditt kontor?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'foodServiceRating',
      title: 'Hvordan opplevde du maten og serveringen?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'praktiskFeedback',
      title: 'Har du kommentarer til den praktiske gjennomføringen?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'praktiskAudioQualityRating',
      title: 'Hvordan opplevde du kvaliteten på lyden på strømmingen? (Fysisk)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'praktiskVideoQualityRating',
      title: 'Hvordan opplevde du kvaliteten på bildet på strømmingen? (Fysisk)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'praktiskStreamingCombinationFeedback',
      title: 'Har du kommentarer om kombinasjonen av strømming och fysiske foredrag? (Fysisk)',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    // Content fields (both types)
    defineField({
      name: 'contentSelectionRating',
      title: 'Hvordan opplevde du utvalget i det faglige innholdet?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'contentPositiveFeedback',
      title: 'Hva var bra med det faglige innholdet?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'contentImprovementFeedback',
      title: 'Hva kan vi forbedre ved det faglige innholdet til lignende arrangementer?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    // Social fields (physical only)
    defineField({
      name: 'socialRating',
      title: 'Hvordan opplevde du den sosiale delen av arrangementet?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    defineField({
      name: 'socialFeedback',
      title: 'Hva kan vi forbedre ved det sosiale delen av arrangementet?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general' || document?.participationLocation === 'Digitalt',
    }),
    // Information fields (both types)
    defineField({
      name: 'websiteRating',
      title: 'Hvordan opplevde du nettsiden?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'informationSourceFeedback',
      title: 'Hvor fikk du informasjon som gjorde at du valgte å melde deg på?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'informationCommentsFeedback',
      title: 'Har du kommentarer til informasjonen du fikk om Bytefest?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    // Overall impression fields (both types)
    defineField({
      name: 'overallImpressionRating',
      title: 'Hva var helhets-inntrykket ditt av Bytefest?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'overallCommentRating',
      title: 'Har du kommentarer til Bytefest som arrangement?',
      type: 'text',
      hidden: ({document}) => document?.feedbackCategory !== 'general',
    }),
    defineField({
      name: 'recommendationRating',
      title: 'Hvor sannsynlig er det at du vil anbefale en kollega å delta på Bytefest på samme måte som deg?',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.feedbackCategory !== 'general',
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
      attendeeName: 'attendee.attendeeName',
      attendeeEmail: 'attendee.attendeeEmail',
      category: 'feedbackCategory',
      participationLocation: 'participationLocation',
      talkTitle: 'relatedTalk.title',
      submitted: 'submittedAt',
    },
    prepare(selection) {
      const {title, attendeeName, attendeeEmail, category, participationLocation, talkTitle, submitted} = selection
      
      // Prioritize attendee name for all feedback types since all feedback now has attendee references
      let displayTitle = attendeeName || attendeeEmail || title || 'Anonymous feedback';
      
      let previewSubtitle = submitted ? new Date(submitted).toLocaleString() : 'No submission date';
      
      if (category === 'talk' && talkTitle) {
        previewSubtitle = `Talk: ${talkTitle} - ${previewSubtitle}`;
      } else if (category === 'general' && participationLocation) {
        previewSubtitle = `${participationLocation} - ${previewSubtitle}`;
      } else if (category === 'speaker') {
        previewSubtitle = `Speaker Experience - ${previewSubtitle}`;
      }

      return {
        title: displayTitle,
        subtitle: previewSubtitle,
      }
    }
  }
}) 