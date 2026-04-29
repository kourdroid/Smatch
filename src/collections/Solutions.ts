import type { CollectionConfig } from 'payload'
import { createRAGAfterChangeHook, createRAGAfterDeleteHook } from '@/hooks/ragSync'
import { QuickPresentation } from '@/blocks/QuickPresentation/config'
import { FunctionalityBenefits } from '@/blocks/FunctionalityBenefits/config'
import { UseCase } from '@/blocks/UseCase/config'
import { SolutionPresentation } from '@/blocks/SolutionPresentation/config'
import { SolutionArchitecture } from '@/blocks/SolutionArchitecture/config'
import { SolutionModuleDetails } from '@/blocks/SolutionModuleDetails/config'
import { SolutionBenefits } from '@/blocks/SolutionBenefits/config'
import { SolutionUseCases } from '@/blocks/SolutionUseCases/config'
import { SolutionCustomSection } from '@/blocks/SolutionCustomSection/config'
import { SolutionAccordion } from '@/blocks/SolutionAccordion/config'
import { adminOrHigher, adminPanelEditorOrHigher, editorOrHigher } from '@/access/roles'
import { createRevalidateHook, createRevalidateDeleteHook } from './hooks/revalidateEntity'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Solutions: CollectionConfig<'solutions'> = {
  slug: 'solutions',
  access: {
    admin: adminPanelEditorOrHigher, // Editor+ can see Solutions in admin
    create: editorOrHigher,       // Editor+ can create
    delete: adminOrHigher,        // Admin+ can delete
    read: () => true,             // Public read access for frontend
    update: editorOrHigher,       // Editor+ can update
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (typeof data.order === 'number') return data

        try {
          const { docs } = await req.payload.find({
            collection: 'solutions',
            depth: 0,
            limit: 1,
            overrideAccess: true,
            pagination: false,
            sort: '-order',
            where: {
              order: {
                exists: true,
              },
            },
          })

          const lastOrder = docs?.[0]?.order
          data.order = (typeof lastOrder === 'number' ? lastOrder : 0) + 1
        } catch {
          return data
        }

        return data
      },
    ],
    afterChange: [createRevalidateHook('solutions'), createRAGAfterChangeHook('solutions')],
    afterDelete: [createRevalidateDeleteHook('solutions'), createRAGAfterDeleteHook('solutions')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card Settings',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Short Description',
              localized: true,
              admin: {
                description: 'Shown on the solution card in the grid',
              },
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Name',
              admin: {
                description: 'Copy from Icon Library (/admin/icons) e.g., Barcode, Truck, Warehouse',
              },
            },
          ],
        },
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              blocks: [
                QuickPresentation,
                FunctionalityBenefits,
                UseCase,
                SolutionPresentation,
                SolutionArchitecture,
                SolutionModuleDetails,
                SolutionBenefits,
                SolutionUseCases,
                SolutionCustomSection,
                SolutionAccordion,
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
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
          ],
        },
      ],
    },
  ],
}
