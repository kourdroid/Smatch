import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutBlock } from './About/Component'
import { EcosystemBlock } from './Ecosystem/Component'
import { DomainsBlock } from './Domains/Component'
import { MissionVisionBlockComponent } from '@/blocks/MissionVision/Component'
import { HistoryTimelineBlockComponent } from '@/blocks/HistoryTimeline/Component'
import { TeamBlockComponent } from '@/blocks/Team/Component'
import { IntroBlockComponent } from '@/blocks/Intro/Component'
import { JournalBlockComponent } from '@/blocks/Journal/Component'
import { SmartGrid } from '@/blocks/SmartGrid/Component'
import { TrustedByBlock } from '@/blocks/TrustedBy/Component'
import { ActivityTimelineBlock } from '@/blocks/ActivityTimeline/Component'
import { ContactBlock } from '@/blocks/Contact/Component'
import { ExpertiseDomainsBlock } from '@/blocks/ExpertiseDomains/Component'
import { SolutionsArchiveBlock } from '@/blocks/SolutionsArchive/Component'
import { AnnouncementSubscriptionBlock } from '@/blocks/AnnouncementSubscription/Component'
import { QuickPresentationBlock } from '@/blocks/QuickPresentation/Component'
import { FunctionalityBenefitsBlock } from '@/blocks/FunctionalityBenefits/Component'
import { UseCaseBlock } from '@/blocks/UseCase/Component'
import { SolutionPresentationBlock } from '@/blocks/SolutionPresentation/Component'
import { SolutionArchitectureBlock } from '@/blocks/SolutionArchitecture/Component'
import { SolutionModuleDetailsBlock } from '@/blocks/SolutionModuleDetails/Component'
import { SolutionBenefitsBlock } from '@/blocks/SolutionBenefits/Component'
import { SolutionUseCasesBlock } from '@/blocks/SolutionUseCases/Component'
import { SolutionCustomSectionBlock } from '@/blocks/SolutionCustomSection/Component'
import { SolutionAccordionBlock } from '@/blocks/SolutionAccordion/Component'

// Type-safe block component registry
// Each component accepts its specific block type props + optional disableInnerContainer
type BlockComponent = React.FC<{ disableInnerContainer?: boolean } & Record<string, unknown>>

const blockComponents: Record<string, BlockComponent> = {
  about: AboutBlock as unknown as BlockComponent,
  ecosystem: EcosystemBlock as unknown as BlockComponent,
  domains: DomainsBlock as unknown as BlockComponent,
  archive: ArchiveBlock as unknown as BlockComponent,
  content: ContentBlock as unknown as BlockComponent,
  cta: CallToActionBlock as unknown as BlockComponent,
  formBlock: FormBlock as unknown as BlockComponent,
  mediaBlock: MediaBlock as unknown as BlockComponent,
  missionVision: MissionVisionBlockComponent as unknown as BlockComponent,
  historyTimeline: HistoryTimelineBlockComponent as unknown as BlockComponent,
  team: TeamBlockComponent as unknown as BlockComponent,
  'smart-grid': SmartGrid as unknown as BlockComponent,
  trustedBy: TrustedByBlock as unknown as BlockComponent,
  activityTimeline: ActivityTimelineBlock as unknown as BlockComponent,
  intro: IntroBlockComponent as unknown as BlockComponent,
  journal: JournalBlockComponent as unknown as BlockComponent,
  contact: ContactBlock as unknown as BlockComponent,
  'expertise-domains': ExpertiseDomainsBlock as unknown as BlockComponent,
  'solutions-archive': SolutionsArchiveBlock as unknown as BlockComponent,
  announcementSubscription: AnnouncementSubscriptionBlock as unknown as BlockComponent,
  quickPresentation: QuickPresentationBlock as unknown as BlockComponent,
  functionalityBenefits: FunctionalityBenefitsBlock as unknown as BlockComponent,
  useCase: UseCaseBlock as unknown as BlockComponent,
  solutionPresentation: SolutionPresentationBlock as unknown as BlockComponent,
  solutionArchitecture: SolutionArchitectureBlock as unknown as BlockComponent,
  solutionModuleDetails: SolutionModuleDetailsBlock as unknown as BlockComponent,
  solutionBenefits: SolutionBenefitsBlock as unknown as BlockComponent,
  solutionUseCases: SolutionUseCasesBlock as unknown as BlockComponent,
  solutionCustomSection: SolutionCustomSectionBlock as unknown as BlockComponent,
  solutionAccordion: SolutionAccordionBlock as unknown as BlockComponent,
}

type LayoutBlock = NonNullable<Page['layout']>[number]

interface RenderBlocksProps {
  blocks: LayoutBlock[]
  locale?: string
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks, locale }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) {
    return null
  }

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (!blockType || !(blockType in blockComponents)) {
          return null
        }

        const Block = blockComponents[blockType]

        // Blocks manage their own container internally via "container mx-auto px-4"
        // This allows full-bleed sections (backgrounds, etc.) while keeping content centered
        return (
          <div key={index}>
            <Block {...block} disableInnerContainer locale={locale} />
          </div>
        )
      })}
    </Fragment>
  )
}
