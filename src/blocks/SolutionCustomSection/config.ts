import type { Block } from 'payload'

export const SolutionCustomSection: Block = {
  slug: 'solutionCustomSection',
  interfaceName: 'SolutionCustomSectionBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
  labels: {
    plural: 'Solution Custom Sections',
    singular: 'Solution Custom Section',
  },
}
