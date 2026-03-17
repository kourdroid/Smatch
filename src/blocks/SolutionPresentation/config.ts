import type { Block } from 'payload'

export const SolutionPresentation: Block = {
  slug: 'solutionPresentation',
  interfaceName: 'SolutionPresentationBlock',
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Introduction',
    },
    {
      name: 'productVision',
      type: 'array',
      label: 'Product Vision Points',
      localized: true,
      admin: {
        description: 'Bullet points representing the product vision',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'mainBenefits',
      type: 'array',
      label: 'Main Benefits Grid',
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
    plural: 'Solution Presentations',
    singular: 'Solution Presentation',
  },
}
