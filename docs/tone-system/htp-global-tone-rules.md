# HTP Global Tone Rules

## 1. Purpose

This document is the master tone guide for HTP premium narrative writing.

It consolidates safe writing lessons from the `tune-analyze/` references into one implementation-ready guide. It is a tone and copywriting document only.

This public document does not expose or change:

- HTP score calculation
- score thresholds
- display score bands
- premium derivedTrait activation
- pattern detection
- archetype detection
- payload schemas
- backend routes
- frontend routes
- DB schema

The core product position is:

```text
HTP result -> current signals -> patterns -> reflective narrative
```

The report should help users think:

```text
This gives me language for what I may be experiencing.
```

It should not make users feel:

```text
This system has diagnosed who I am.
```

## 2. Public Boundaries

Tone rules are included here only to show the safety posture of the user-facing writing system.

| Area | Source of truth | Tone rule |
| --- | --- | --- |
| Scoring | Private backend implementation | Never redefine or recalculate scores in copy. |
| Basic report | Private backend API and public frontend renderer | Basic report remains HTP-only. |
| Premium report | Private backend API and public frontend renderer | Premium may add self-report context only as a secondary lens. |
| Archetypes | Private backend implementation | Present as current flow summaries, not fixed identity types. |
| LLM role | Private prompt and validation layer | Narrative rendering and tone polishing only. |
| External references | Public-safe generalized style principles | Style inspiration only, not product logic. |

If this document appears to conflict with private implementation rules, the private implementation rules win.

## 3. Core Principles

### HTP Is Primary

HTP remains the primary interpretive source.

Use:

- "HTP에서 관찰된 신호"
- "이번 결과에서 보이는 흐름"
- "그림 기반 신호와 현재 맥락을 함께 살펴보면"

Avoid:

- MBTI-first interpretation
- MBTI as objective proof
- MBTI as a reason to override HTP

### MBTI Is Supporting Context Only

MBTI may be used in premium reports as:

- self-perception context
- others-perception context
- a conversation lens
- a comparison layer

MBTI must not:

- create high-confidence traits by itself
- override HTP signals
- become the primary report identity
- be described as scientific proof of personality

Safe wording:

```text
MBTI 정보가 있다면, 이는 내가 보는 나와 주변에서 보는 나를 비교해 보는 보조 맥락으로만 사용됩니다.
```

### Archetypes Are Flow Summaries

Archetypes summarize the current HTP/pattern flow. They are not fixed personality types.

Use:

- "이번 결과에서 중심에 놓인 흐름"
- "현재 관찰되는 패턴을 묶어 보면"
- "이 아키타입은 성격 유형이라기보다, 지금 두드러진 흐름을 설명하는 이름입니다."

Avoid:

- "당신은 관계 에너지 조절형입니다."
- "당신의 성격 유형은..."
- "이 유형의 사람은..."
- "본질적으로..."

### LLMs Render, They Do Not Decide

LLMs may:

- rewrite deterministic content into warmer language
- render backend-provided structure into readable narrative
- reduce repetition
- improve emotional pacing

LLMs must not:

- invent psychological logic
- change thresholds
- recalculate scores
- infer hidden causes
- diagnose
- decide primary archetype
- turn MBTI into evidence stronger than HTP

Prompt-safe instruction:

```text
Use the provided backend signals, patterns, archetypes, signalStrength, and report schema only. Do not reinterpret score cutoffs or create new psychological rules.
```

## 4. Score Language Rules

This document does not define score cutoffs.

Canonical score and band behavior lives in:

```text
private backend scoring policy
```

Current premium signalStrength wording should align with:

| Signal strength | Tone guidance |
| --- | --- |
| none / inactive | 크게 두드러지지 않는 신호 |
| mild | 가볍게 살펴볼 신호 |
| moderate | 조금 더 두드러진 신호 |
| strong | 뚜렷하게 높은 신호 |

Rules:

- Do not make mild signals sound severe.
- Do not make moderate signals sound weak.
- Do not make strong signals sound alarming or diagnostic.
- Do not call an archetype match score psychological intensity.
- Pattern/archetype score is match confidence, not clinical severity.
- Avoid red-alert language unless a separate clinically reviewed safety workflow exists.

Safe score copy:

```text
이 점수는 판단이나 평가라기보다, 현재 어떤 흐름이 조금 더 눈에 띄는지 살펴보는 참고 신호입니다.
```

Avoid:

```text
위험합니다.
문제가 심합니다.
정상 범위를 벗어났습니다.
이 점수가 원인입니다.
```

## 5. External Style Reference Rules

External references are style references only.

| Reference | Safe to borrow | Do not borrow |
| --- | --- | --- |
| Consumer health report | concise premium signal language, clear section rhythm | clinician-reviewed authority, medical certainty, biomarker claims |
| Metabolic feedback app | pattern-over-incident language, context-aware explanations, "feedback not judgment" | glucose thresholds, nutrition advice, metabolic claims |
| Wearable wellness app | balance, baseline, dynamic state, pay-attention-not-alarm language | HRV, sleep, body temperature, readiness thresholds, physiological claims |
| Performance recovery app | load/capacity/recovery metaphors, journal/reflection structure | performance pressure, sleep prescriptions, medical stress claims |
| Genetic traits report | non-deterministic phrasing, humility, "one part of the picture" safety | genetic determinism, risk prediction, fake percentages |
| Personality insights report | recognition-first storytelling, strength+tension structure | fixed personality type claims, destiny/mission language |

External terms that should not appear in HTP user-facing copy unless explicitly approved later:

- biomarker
- HRV
- glucose
- metabolic health
- medication
- clinician-reviewed
- medical risk
- disease risk
- genetic prediction
- population percentile
- physiological stress measurement

Allowed adapted concepts:

- signal
- pattern
- flow
- current context
- balance
- recovery as emotional pacing, not medical recovery
- small reflection
- small experiment
- personal baseline, only when comparing the user's own repeated reports later

## 6. Preferred Vocabulary

### Korean

Prefer:

- 신호
- 흐름
- 경향
- 단서
- 가능성
- 돌아볼 지점
- 살펴볼 수 있습니다
- 나타날 수 있습니다
- 연결해 볼 수 있습니다
- 최근 상황과 함께 볼 수 있습니다
- 한 가지 관찰 포인트
- 자기이해
- 균형
- 조율
- 회복 흐름
- 작은 실험
- 성찰 질문

Use carefully:

- 높음
- 강함
- 부담
- 긴장
- 회피
- 방어
- 소진

These can be used when they are backend-provided signal names or established report language, but they should be softened with context and non-diagnostic phrasing.

### English

Prefer:

- signal
- pattern
- tendency
- flow
- reflection point
- current context
- may
- can
- could
- one part of the picture
- not a fixed identity

Avoid certainty words unless quoting a source in internal docs:

- definitely
- proven
- fixed
- always
- never
- predicts
- determines

## 7. Forbidden User-Facing Language

Do not use these in user-facing report copy:

### Korean

- 진단
- 장애
- 질병
- 병리
- 치료가 필요합니다
- 위험군
- 정상
- 비정상
- 결함
- 문제 있음
- 원인입니다
- 반드시
- 확실합니다
- 증명합니다
- 예측합니다
- 당신은 이런 사람입니다
- 당신의 본질은
- 타고난 성격
- 고정된 성격
- 회피형 애착
- 불안 장애
- 우울증

### English

- diagnosis
- disorder
- pathology
- treatment
- risk group
- abnormal
- defect
- cause
- proven
- fixed personality
- destiny
- predict
- medical advice
- clinical conclusion

Exception:

Safety notices may say that the report is not for diagnosis or treatment. In that case, use the terms only in a negating safety context:

```text
이 리포트는 진단이나 치료를 위한 문서가 아닙니다.
```

## 8. Section Writing Patterns

### Positioning Notice

Goal:

- Establish safety before sensitive content.
- Separate the report from diagnosis, treatment, and identity typing.

Use:

```text
이 리포트는 진단이나 치료를 위한 문서가 아니라, 현재의 마음과 관계 방식을 돌아보기 위한 자기이해 자료입니다.
```

### Overall Summary / Fusion Summary

Goal:

- Connect HTP signals into a short, emotionally safe overview.
- Mention MBTI only when available and only as comparison context.

Pattern:

```text
HTP에서 보이는 현재 흐름
-> 관계/표현/정서 맥락
-> MBTI self/others context if available
-> reflection invitation
```

Rules:

- 2-4 short paragraphs.
- HTP first.
- No raw scores unless the section explicitly needs them.
- End with a reflection invitation.

### Archetype Section

Goal:

- Give a memorable but non-fixed name to the current dominant HTP/pattern flow.

Pattern:

```text
이번 결과에서 중심에 놓인 흐름은 {archetypeName}으로 정리해 볼 수 있습니다.
```

Then explain:

- what pattern evidence supports it
- how it may appear in daily life
- what helps balance it

Avoid:

- type identity language
- "people like this..."
- personality destiny

### Pattern Section

Goal:

- Explain feature -> pattern in practical, emotionally realistic language.

Pattern:

```text
이 패턴은 {featureA}와 {featureB}가 함께 나타날 때 살펴볼 수 있는 흐름입니다.
생활에서는 {example}처럼 느껴질 수 있지만, 이것이 항상 같은 방식으로 드러난다는 뜻은 아닙니다.
```

Use enrichment as:

- example material
- reflection prompts
- context hints
- small growth hints

Do not use enrichment as:

- additional diagnostic evidence
- score evidence
- hidden cause

### Resource Tarot Section

Goal:

- Show stabilizing resources without making "positive vs negative" categories.

Pattern:

```text
긴장 흐름과 함께, 이를 부드럽게 조율하거나 회복을 돕는 자원 흐름도 함께 살펴볼 수 있습니다.
```

Rules:

- Resource Tarot is a balancing lens.
- It does not replace primary archetype.
- It does not change score logic.
- It should not imply low scores prove mental health.
- Avoid "good card / bad card" language.

### Growth Direction

Goal:

- Offer practical reflection, not treatment or coaching pressure.

Use:

- "작게 관찰해 보기"
- "최근 장면과 연결해 보기"
- "한 문장으로 표현해 보기"
- "다음 대화에서 다뤄보기"

Avoid:

- "고쳐야 합니다"
- "반드시 이렇게 해야 합니다"
- "치료해야 합니다"
- "습관을 바꾸세요" as a command

### AI Conversation Starter

Goal:

- Invite continuation without turning the report into advice-giving.

Use:

```text
이 리포트에서 가장 공감되는 흐름을 함께 정리해보고 싶어요.
```

Avoid:

```text
내 문제의 원인을 분석해줘.
```

## 9. User-Facing Visibility Rules

Do not show normal users:

- raw payload JSON
- `schemaVersion`
- internal IDs as primary copy
- raw score internals
- source score paths
- DB table names
- scoring formulas
- serialized legacy rules
- admin-only metadata
- provider usage
- token cost
- raw prompt
- raw LLM input
- `sourceInputMeta`

Allowed:

- user-facing names
- Korean pattern names
- Korean archetype names
- safe one-line explanations
- evidence chips if they are human-readable and non-internal
- general hierarchy explanation: feature -> pattern -> archetype

Safe explanation:

```text
이 리포트는 그림 기반 신호를 먼저 살펴보고, 함께 나타나는 신호를 패턴으로 묶은 뒤, 전체 흐름을 아키타입으로 정리합니다.
```

## 10. Prompt-Ready Global Instruction

Use this block when creating or updating LLM narrative prompts:

```text
Write in Korean for a premium HTP self-reflection report.

HTP is the primary source. MBTI, if present, is supporting self/social perception context only.
Use only the backend-provided signals, patterns, archetypes, resource patterns, signalStrength, intensitySummary, and report schema.
Do not reinterpret score cutoffs, recalculate scores, infer hidden causes, or invent new psychological rules.

Describe archetypes as current HTP/pattern flows, not fixed personality types.
Describe patterns as reflective signals and everyday contexts, not diagnoses.
Use pattern enrichment and resource material as narrative support only, not additional diagnostic evidence.

Avoid diagnosis, treatment, pathology, certainty, causality, fixed identity, future prediction, risk, population percentile, medical, biometric, or clinical language.
Do not expose raw payload fields, internal IDs, schema names, score formulas, DB fields, prompt text, or debug metadata.

Use warm, calm, editorial Korean.
Prefer shorter readable paragraphs with emotional pacing.
Premium reports may be rich and detailed, but they should not become dense walls of text.
```

## 11. Copy QA Checklist

Before shipping a premium narrative, check:

- [ ] Does HTP remain the primary source?
- [ ] Is MBTI only supporting context?
- [ ] Are all score cutoffs inherited from the private backend scoring policy?
- [ ] Does the copy avoid recalculating or redefining thresholds?
- [ ] Are archetypes described as current flows, not fixed types?
- [ ] Are pattern/archetype scores kept separate from psychological intensity?
- [ ] Does the copy avoid diagnosis, treatment, disorder, pathology, and crisis claims?
- [ ] Does the copy avoid deterministic identity language such as "당신은 ~입니다"?
- [ ] Does it avoid "risk," fake percentages, population claims, and prediction language?
- [ ] Does it avoid health/biometric leakage such as HRV, glucose, biomarkers, or medical review?
- [ ] Are raw payloads, internal IDs, DB fields, formulas, provider usage, and debug metadata hidden?
- [ ] Are mild signals gentle and strong signals clear but non-alarming?
- [ ] Does the narrative use "신호," "흐름," "경향," "가능성," and "돌아볼 지점" naturally?
- [ ] Does the report invite reflection rather than prescribe action?
- [ ] Does the section rhythm feel readable, not like a dense clinical dashboard?

## 12. Implementation Notes

Use this document when working on:

- deterministic narrative composers
- premium narrative prompt templates
- LLM output validators
- report renderer microcopy
- archetype descriptions
- pattern/resource card descriptions
- future tone QA scripts

Do not use this document to justify:

- score logic changes
- threshold changes
- MBTI-first interpretation
- new clinical claims
- raw/internal user-facing explanations
- public basic report changes

Final principle:

```text
The report should explain what is currently visible, what patterns may be worth noticing, and what questions can help the user reflect.
It should not decide who the user is.
```
