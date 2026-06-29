# Frontend Plan

## 1. Current Stack

- Angular
- Standalone components
- Auth/admin guards
- CSS component styles
- Chart UI for basic report
- Premium report reusable renderer

---

## 2. Current Page Groups

### Auth / Member

- `/login`
- `/signup`
- `/my/reports`

### Basic HTP Report

- `/report/:sbId`
- `/report/:sbId/sections/:sectionKey`

Purpose:

- show legacy HTP images, scores, charts, and section text
- remain HTP-only
- do not expose premium/MBTI/LLM content

### Premium Report

- `/premium-report/mock`
- `/premium-report/:sbNo`
- `/premium-report/:sbNo/versions/:prNo`

Purpose:

- render static mock report for design iteration
- render latest saved premium report from backend
- render specific saved premium report version
- use shared `PremiumReportRendererComponent`

### Admin

- `/admin/dashboard`
- `/admin/search`
- `/admin/members`
- `/admin/sketchbooks`
- `/admin/sketchbooks/:sbNo/profile`
- `/admin/sketchbooks/:sbNo/analyze`
- `/admin/sketchbooks/:sbNo/analyze-senior`
- `/admin/premium-preview/:sbNo`
- `/admin/premium-preview/:sbNo/history`
- `/admin/premium-reports/:sbNo/history`

Purpose:

- inspect users/sketchbooks
- edit sketchbook profile/MBTI
- inspect premium payload
- inspect premium report history

---

## 3. Premium UI Components

Current reusable premium components:

- `PremiumReportRendererComponent`
- `PremiumArchetypeHeroCardComponent`
- `PremiumPatternCardsSectionComponent`

Current premium visual layers:

- cover/title
- self-reflection notice
- one-line summary
- overall summary
- archetype or fallback hero
- pattern & balance cards
- archetype section
- core/tension pattern sections
- resourceSection
- MBTI comparison
- reflection section
- growth direction
- conversation starters
- safety note

---

## 4. Design Rules

Basic report:

- clear
- structured
- score/chart readable
- legacy result faithful

Premium report:

- calm
- editorial
- reflective
- premium journal-like
- non-diagnostic
- not an admin dashboard
- not clinical
- not deterministic personality typing

---

## 5. Current Priority

The basic frontend MVP is complete.

Current priority:

1. Premium report QA/human rating
2. Premium copy/readability polish
3. Product generation state UX
4. PDF/export design
5. Payment/permission UI
6. Similar-user/RAG section later

