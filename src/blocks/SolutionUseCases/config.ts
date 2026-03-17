import type { Block } from 'payload'

export const SolutionUseCases: Block = {
  slug: 'solutionUseCases',
  interfaceName: 'SolutionUseCasesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Use cases',
    },
    {
      name: 'cases',
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
          type: 'richText',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Solution Use Cases',
    singular: 'Solution Use Case',
  },
}
