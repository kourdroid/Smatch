import type { Block } from 'payload'

export const SolutionModuleDetails: Block = {
  slug: 'solutionModuleDetails',
  interfaceName: 'SolutionModuleDetailsBlock',
  fields: [
    {
      name: 'moduleId',
      type: 'text',
      required: true,
      label: 'Module Anchor ID (e.g., module-inbound)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Icon Name',
      admin: {
        description: 'Copiez le nom de l\'icône depuis PhosphorIcons (ex: Warehouse, Cube)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'bulletPoints',
      type: 'array',
      localized: true,
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
      name: 'aiBlock',
      type: 'group',
      label: 'AI Feature Block (Optional)',
      admin: {
        description: 'Optional AI-specific features for this module',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'points',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'point',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'subModules',
      type: 'array',
      label: 'Sub-Modules (Accordion items)',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Solution Module Details',
    singular: 'Solution Module Detail',
  },
}
