# Data Model: Modular Solutions Detail Page

This document defines the data structures and PayloadCMS configurations required to support the new modular layout for Solution Detail pages.

## Entities

### `Solutions` Internal Structure (Collection Update)

The `Solutions` collection (`src/collections/Solutions.ts`) will be updated to modify the `layout` field in the `Content` tab.

**Modifications**:
- Existing `Card Settings` and `Hero Section` tabs: **UNCHANGED**
- `Content` tab `layout`: Add new blocks to the `blocks` array.

### PayloadCMS Blocks (New & Updated)

All fields are localized (`localized: true`) to preserve the existing dual-language capabilities (FR/EN). 

#### 1. `SolutionPresentation` Block
Represents the "Présentation de la solution" section.
- **`intro`** (RichText / Textarea): Main introductory paragraph.
- **`productVision`** (Array): List of vision features.
  - `point` (Text)
- **`mainBenefits`** (Array): The "Avantages principaux" grid.
  - `title` (Text)
  - `description` (Textarea)

#### 2. `SolutionArchitecture` Block
Represents the "Architecture de la solution WMS".
- **`intro`** (Textarea): Section subtitle/intro.
- **`modules`** (Array): The grid of architecture modules.
  - `icon` (Text / Select): e.g., 'Inbound', 'Outbound'.
  - `title` (Text)
  - `anchorLink` (Text): e.g., `#module-inbound`

#### 3. `SolutionModuleDetails` Block (Optional - For individual modules like INBOUND, OUTBOUND)
To dynamically build the detailed sections shown in the HTML.
- **`moduleId`** (Text): For anchor linking (e.g., `module-inbound`).
- **`title`** (Text)
- **`icon`** (Text)
- **`description`** (Textarea)
- **`bulletPoints`** (Array)
  - `point` (Text)
- **`aiBlock`** (Group - Optional)
  - `title` (Text)
  - `points` (Array of Text)
- **`subModules`** (Array - Maps to the Accordion in the HTML)
  - `title` (Text)
  - `content` (RichText / Textarea)

#### 4. `SolutionBenefits` Block
Represents the "Avantages" section (if separate from Presentation).
- **`title`** (Text)
- **`benefits`** (Array)
  - `title` (Text)
  - `description` (Textarea)

#### 5. `SolutionUseCases` Block
- **`title`** (Text)
- **`cases`** (Array)
  - `title` (Text)
  - `description` (RichText)

#### 6. `SolutionCustomSection` Block
A completely flexible rich text or nested block area for custom content specific to a solution.
- **`content`** (RichText: Lexical Editor)

#### 7. `SolutionAccordion` Block
A standalone accordion module.
- **`items`** (Array)
  - `header` (Text)
  - `body` (RichText)

## Validation Rules

- At least one block should be present in the `layout` to render a meaningful page, but all specific blocks are inherently optional to maintain modularity.
- `slug` remains required and unique per Solution.

## Relationships
- No new cross-collection relationships are introduced. Media uploads within RichText or hero settings rely on the existing `media` collection.
