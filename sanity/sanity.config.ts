import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Define the custom desk structure
export const customStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Feedback section
      S.listItem()
        .title('Feedback')
        .id('feedback-root')
        // .icon(UserIcon) // Example: Add an icon if you have one imported
        .child(
          S.list()
            .title('Feedback by Category')
            .items([
              S.listItem()
                .title('General Event Feedback')
                .schemaType('feedback')
                .child(
                  S.documentList()
                    .title('General Event Feedback')
                    .filter('_type == "feedback" && feedbackCategory == "general"')
                ),
              S.listItem()
                .title('Talk-Specific Feedback')
                .schemaType('feedback')
                .child(
                  S.documentList()
                    .title('Talk-Specific Feedback')
                    .filter('_type == "feedback" && feedbackCategory == "talk"')
                ),
              S.listItem()
                .title('Speaker Experience Feedback')
                .schemaType('feedback')
                .child(
                  S.documentList()
                    .title('Speaker Experience Feedback')
                    .filter('_type == "feedback" && feedbackCategory == "speaker"')
                ),
                S.divider(),
                S.listItem()
                .title('All Feedback')
                .schemaType('feedback')
                .child(S.documentList().title('All Feedback').filter('_type == "feedback"')),
            ])
        ),
      S.divider(),
      // Filter out 'feedback' from the default document type list items
      // as it's already handled in the custom structure above
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'feedback'
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Bytefest',

  projectId: 'twav4yff',
  dataset: 'production',

  plugins: [structureTool({structure: customStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
