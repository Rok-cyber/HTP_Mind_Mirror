# Public Architecture Overview

This public repository is a portfolio-safe version of the HTP Web project. It keeps the user-facing Angular implementation and high-level product/API documentation while redacting proprietary backend report-generation logic.

## Publicly Included

- Angular frontend implementation
- Premium report renderer and UI components
- Auth/session frontend flow
- Admin screen structure and API client patterns
- API contract documentation
- Portfolio README, audit notes, and demo guide
- Backend environment example and architecture note

## Intentionally Redacted

- HTP scoring implementation
- Pattern and archetype detection rules
- Prompt template construction
- LLM report-input builder
- Premium report generation orchestration
- Raw database audit outputs
- Legacy PHP source
- Third-party style-reference research notes

## Private Production Flow

```text
HTP drawing / legacy result data
  -> private backend scoring and feature extraction
  -> structured report context
  -> private prompt and validation layer
  -> premium report JSON
  -> database persistence
  -> Angular renderer
```

## Why Redact

The report-generation layer contains product-specific psychological interpretation rules and prompt engineering that are not necessary for recruiter review. The public repository focuses on application architecture, frontend implementation, API shape, safety posture, and documentation quality.
