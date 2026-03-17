<!--
SYNC IMPACT REPORT
- Version: 0.0.0 -> 1.0.0
- Modified Principles: 
  - Defined I. The 100-Step Prediction (Structural & Data Integrity)
  - Defined II. The Sovereign Audit (Truth Over Guessing)
  - Defined III. Type Safety & Correctness (Non-Negotiable)
  - Defined IV. Defensive Architecture & Security (Zero Trust)
  - Defined V. Industrial Luxury Design System
  - Defined VI. Component Architecture & Styling
- Added sections: Interaction Modes, Guidelines & Tech Stack
- Removed sections: N/A
- Templates requiring updates: 
  - ⚠ .specify/templates/plan-template.md
  - ⚠ .specify/templates/spec-template.md
  - ⚠ .specify/templates/tasks-template.md
- Follow-up TODOs: Implement checks in templates for new principles.
-->

# Smatch Constitution

## Core Principles

### I. The 100-Step Prediction (Structural & Data Integrity)
Before writing code, the system's future must be projected across scaling milestones (functioning, 10k users, high concurrency, and long-term maintenance). All architecture must strictly adhere to Clean Architecture (SOLID, Dependency Rule) and DDIA (Designing Data-Intensive Applications) principles for reliability, scalability, and optimal choice of data models. 

### II. The Sovereign Audit (Truth Over Guessing)
Hallucination is the ultimate sin. Never guess an API signature or invent a library method. Mandatory verification against official documentation is required for every library, SDK, or framework. Flawed technical suggestions must be refused and corrected with clinical authority.

### III. Type Safety & Correctness (Non-Negotiable)
TypeScript must be strictly enforced (`strict: true`). The use of `any` is strictly prohibited. Runtime validation at API boundaries must be handled via Zod. End-to-end type safety from PayloadCMS database generation to React frontend components is required. 

### IV. Defensive Architecture & Security (Zero Trust)
Inputs must be sanitized at the edge; the client is never trusted. Error handling must catch specific errors with context, and exceptions must never be swallowed. Business logic must be decoupled via dependency injection and isolated from framework-specific code. Security requires short-lived JWTs (OAuth2/OIDC) and strict environment variable usage for secrets.

### V. Industrial Luxury Design System
The frontend must convey high-end industrial proficiency and data density. Designs enforce high contrast, purposeful whitespace, and smooth motion (GSAP + Framer Motion). Strict adherence to `smatch-*` design tokens (e.g., `smatch-black`, `smatch-gold`) is mandatory; hardcoded hex values are forbidden. All layouts must be mobile-first and fully responsive.

### VI. Component Architecture & Styling
Next.js React Server Components are the default. Client Components (`'use client'`) are restricted to files explicitly requiring interactivity or hooks. UI construction must wrap existing Shadcn/UI and Radix primitives rather than reinventing standard components.

## Interaction Modes & Workflow

### Mode A: "EXECUTE"
For standard requests and bug fixes: Code is generated immediately with zero conversation. APIs are silently verified via official docs before outputting.

### Mode B: "ULTRATHINK"
Triggered for new setups, major refactors, or complex systems: The agent stops and engages the "Monster Protocol." This includes fetching documentation, analyzing data consistency models, defining Clean Architecture boundaries, stress-testing for 1M users, providing a system blueprint, and finally delivering flawless code.

## Guidelines & Tech Stack

### Core Technologies
- **Next.js 15.4** (App Router, Server Components)
- **PayloadCMS 3.68** (Headless CMS, PostgreSQL Database)
- **React 19.2** & **TypeScript 5.7**
- **TailwindCSS 3.4** & **Framer Motion / GSAP**

### Contribution Standard
All contributions must pass strict TypeScript checks, linting, and rely on generated Payload types (`@/payload-types`). Commit messages must follow Conventional Commits format.

## Governance

The Constitution supersedes all other practices. All AI generations and Pull Requests must be validated against these principles. Any architectural deviation requires an explicit overriding justification based on DDIA or Clean Architecture, subject to review.

**Version**: 1.0.0 | **Ratified**: 2026-03-17 | **Last Amended**: 2026-03-17
