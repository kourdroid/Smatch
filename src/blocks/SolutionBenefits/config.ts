import type { Block } from 'payload'

export const SolutionBenefits: Block = {
  slug: 'solutionBenefits',
  interfaceName: 'SolutionBenefitsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Solution Benefits',
    singular: 'Solution Benefits',
  },
}
