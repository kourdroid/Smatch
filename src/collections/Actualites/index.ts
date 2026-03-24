import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { adminOrHigher, adminPanelEditorOrHigher, editorOrHigher } from '../../access/roles'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { n8nIngestEndpoint } from './endpoints'
import { createRevalidateHook, createRevalidateDeleteHook } from '../hooks/revalidateEntity'

export const Actualites: CollectionConfig<'actualites'> = {
  slug: 'actualites',
  endpoints: [n8nIngestEndpoint],
  access: {
    admin: adminPanelEditorOrHigher,
    create: authenticatedOrPublished, // We need the n8n webhook API user to be able to create, or we can use admin API keys
    delete: adminOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  hooks: {
    afterChange: [createRevalidateHook('actualites')],
    afterDelete: [createRevalidateDeleteHook('actualites')],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    heroImage: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'source', 'publishedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'actualites',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'actualites',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'A plain text brief excerpt (~150 chars).',
              },
            },
            {
              name: 'body',
              type: 'richText',
              localized: true,
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'The main hero image for the listing card and article header.',
              },
            },
            {
              name: 'additionalImages',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Metadata',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                },
              ],
            },
            {
              name: 'estimatedReadTime',
              type: 'number',
              required: true,
            },
            {
              name: 'source',
              type: 'select',
              required: true,
              defaultValue: 'manual',
              options: [
                { label: 'AI Generated', value: 'ai-generated' },
                { label: 'Manual', value: 'manual' },
              ],
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
              hooks: {
                beforeChange: [
                  ({ siblingData, value }) => {
                    if (siblingData._status === 'published' && !value) {
                      return new Date()
                    }
                    return value
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            {
              name: 'focusKeywords',
              type: 'text',
              localized: true,
            },
            {
              name: 'seoPotentialScore',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 0,
            },
          ],
        },
        {
          label: 'Schema JSON-LD',
          fields: [
            {
              name: 'faqEntries',
              type: 'array',
              localized: true,
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
