import type { Block } from 'payload'

export const SolutionAccordion: Block = {
  slug: 'solutionAccordion',
  interfaceName: 'SolutionAccordionBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'header',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'body',
          type: 'richText',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Solution Accordions',
    singular: 'Solution Accordion',
  },
}
