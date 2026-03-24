import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import { i18nConfig } from '@/utilities/i18n'

export const createRevalidateHook = (collectionPrefix: string): CollectionAfterChangeHook => {
  return ({ doc, previousDoc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      // Revalidate all locale-prefixed paths for the item
      for (const locale of i18nConfig.locales) {
        // Revalidate the list view
        revalidatePath(`/${locale}/${collectionPrefix}`)

        // Revalidate the specific document if it has a slug
        if (doc.slug) {
          const path = `/${locale}/${collectionPrefix}/${doc.slug}`
          payload.logger.info(`Revalidating ${collectionPrefix} at path: ${path}`)
          revalidatePath(path)
        }
      }
      revalidateTag(`${collectionPrefix}-sitemap`)

      // If the document was previously using a different slug, revalidate the old path
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        for (const locale of i18nConfig.locales) {
          const oldPath = `/${locale}/${collectionPrefix}/${previousDoc.slug}`
          payload.logger.info(`Revalidating old ${collectionPrefix} path: ${oldPath}`)
          revalidatePath(oldPath)
        }
        revalidateTag(`${collectionPrefix}-sitemap`)
      }
    }
    return doc
  }
}

export const createRevalidateDeleteHook = (collectionPrefix: string): CollectionAfterDeleteHook => {
  return ({ doc, req: { context, payload } }) => {
    if (!context.disableRevalidate) {
      for (const locale of i18nConfig.locales) {
        // Revalidate the list view
        revalidatePath(`/${locale}/${collectionPrefix}`)

        // Revalidate the specific document if it has a slug
        if (doc?.slug) {
          const path = `/${locale}/${collectionPrefix}/${doc.slug}`
          payload.logger.info(`Revalidating deleted ${collectionPrefix} at path: ${path}`)
          revalidatePath(path)
        }
      }
      revalidateTag(`${collectionPrefix}-sitemap`)
    }
    return doc
  }
}
