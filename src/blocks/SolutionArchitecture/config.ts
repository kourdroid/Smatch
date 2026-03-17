import type { Block } from 'payload'

export const SolutionArchitecture: Block = {
  slug: 'solutionArchitecture',
  interfaceName: 'SolutionArchitectureBlock',
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Introduction / Subtitle',
    },
    {
      name: 'modules',
      type: 'array',
      label: 'Architecture Modules',
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Icon Name (e.g., Inbound, Outbound)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'anchorLink',
          type: 'text',
          required: true,
          label: 'Anchor Link (e.g., #module-inbound)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Solution Architectures',
    singular: 'Solution Architecture',
  },
}
