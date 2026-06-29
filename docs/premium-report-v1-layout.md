# Premium Report v1 Layout Draft

This document describes the first practical layout direction for the Premium Report v1 UI. It is documentation only and does not add routes, change frontend code, or modify backend behavior.

> Current implementation note: the live premium report renderer now includes an Archetype/Fallback Hero block and Pattern & Balance Cards near the top. For current hero/card behavior, see `docs/premium-report-hero-system-v1.md`.

The premium report should feel like a personal mirror: warm, readable, and emotionally safe. It should help users notice patterns and continue reflection, not label, diagnose, or treat them.

## 1. Purpose of Premium Report v1

Premium Report v1 is a user-facing reflection report built from the existing premium payload:

- `subject`
- `htp.scores`
- `htp.narrative`
- `mbtiPerception`
- `derivedTraits`
- `perceptionGap`
- `reflectionPrompts`
- `safety`

Purpose:

- Turn HTP signals and MBTI perception data into an understandable reflection experience.
- Show users a balanced view of current emotional, relational, and self-perception signals.
- Invite users to continue thinking with guided prompts or future AI conversation.
- Keep the basic HTP report unchanged and separate.

Non-purpose:

- Do not diagnose the user.
- Do not provide treatment recommendations.
- Do not claim HTP or MBTI proves personality.
- Do not present premium output as a clinical report.

## 2. Target User Experience

The report should feel:

- personal, calm, and readable
- reflective rather than evaluative
- premium but not flashy
- structured enough to scan
- gentle enough for sensitive emotional content

The user should come away thinking:

- "This gives me language for what I might be experiencing."
- "This helps me compare how I see myself and how others may see me."
- "I have a few useful questions to keep reflecting on."
- "This is not judging me."

Avoid:

- clinical dashboard feeling
- excessive score emphasis
- alarming colors or warning labels
- personality-type determinism
- long walls of text

## 3. Report Section Order

Recommended first version order:

1. Cover / title
2. Self-reflection positioning notice
3. One-line summary / overall summary
4. Archetype or fallback hero summary
5. Pattern & Balance Cards
6. HTP core signals / pattern detail
7. Self MBTI vs Others MBTI
8. Perception gap when available
9. Reflection prompts
10. Growth direction
11. AI conversation guide
12. Download/export placeholder

This order starts with orientation and safety, then gives a snapshot, then moves from signals to reflection.

## 4. Section-by-Section Layout

### 1. Cover / Title

Purpose:

- Introduce the premium report as a personal reflection report.
- Establish name, date, and report identity.

Suggested layout:

- Large title: `프리미엄 자기이해 리포트`
- Subtitle: `HTP 검사와 자기 인식 정보를 바탕으로 구성한 돌아보기 리포트`
- Subject line:
  - name
  - age when available
  - report date
  - report type

Data source:

- `subject.name`
- `subject.age`
- `subject.reportDate`
- `subject.reportType`

Do not show:

- raw `sb_no` prominently to users
- schema version
- generated timestamp unless in export metadata

### 2. Self-Reflection Positioning Notice

Purpose:

- Set expectations before the user reads sensitive content.
- Clearly separate the report from diagnosis/treatment.

Suggested copy:

```text
이 리포트는 진단이나 치료를 위한 문서가 아니라, 현재의 마음과 관계 방식을 돌아보기 위한 자기이해 자료입니다.
점수와 유형은 나를 단정하기보다, 생각해 볼 질문을 만드는 참고 신호로 읽어 주세요.
```

Data source:

- `safety.positioning`
- `safety.nonDiagnostic`
- `safety.notTreatment`

Layout:

- Soft notice block near the top.
- Keep it visible but not scary.

### 3. Personal Snapshot

Purpose:

- Summarize the report in one compact view.
- Give the user the "what stands out" view before details.

Suggested content:

- Subject info
- MBTI self/others values when present
- Count of derived traits
- Count of perception gaps
- Count of reflection prompts

Example display:

```text
내가 생각하는 나: INTJ
지인이 보는 나: ENFP
주요 신호: 5개
인식 차이: 3개
생각해 볼 질문: 8개
```

Data source:

- `subject`
- `mbtiPerception`
- `derivedTraits.length`
- `perceptionGap.items.length`
- `reflectionPrompts.length`

Empty state:

- If MBTI is missing, show `선택 안 함` or omit the row.
- Do not make missing MBTI feel like a problem.

### 4. HTP Core Signals

Purpose:

- Present the main HTP-derived signals in a user-friendly way.
- Avoid making this section feel like a clinical scorecard.

Suggested content:

- A short narrative summary from `htp.narrative.overall`.
- A compact list of `derivedTraits`.
- Optional score chips only as supporting context.

Data source:

- `htp.narrative.overall`
- `derivedTraits`
- `derivedTraits[].sourceScores`
- optionally `htp.scores`

Trait card content:

- `label`
- `signalStrength`
- `summary`
- source score labels and scores

Example:

```text
조심스러운 관계 방식
관계에서 거리를 두거나 신중하게 반응하는 경향을 돌아볼 수 있습니다.
근거 신호: 위축 55점
```

Signal strength labels:

- `mild`: `가볍게 살펴볼 신호`
- `moderate`: `조금 더 두드러진 신호`
- `strong`: `강하게 나타난 신호`

Do not show:

- raw feature rows
- scoring formulas
- internal trait ids by default

### 5. Self MBTI vs Others MBTI

Purpose:

- Show self perception and social perception side by side.
- Frame MBTI as a conversation lens, not proof.

Suggested layout:

- Two columns or two simple cards:
  - `내가 생각하는 내 MBTI`
  - `지인이 생각하는 내 MBTI`
- Display value or empty state.

Data source:

- `mbtiPerception.self`
- `mbtiPerception.others`
- `mbtiPerception.status`

Suggested copy:

```text
MBTI는 나를 확정하는 기준이 아니라, 내가 보는 나와 주변에서 느끼는 나를 비교해 보는 하나의 언어로 사용합니다.
```

Empty state:

- If both are missing:
  - `아직 MBTI 인식 정보가 입력되지 않았습니다.`
- If one is missing:
  - `한쪽 정보만 있어 비교보다는 단일 인식으로 참고합니다.`

### 6. Perception Gap

Purpose:

- Help the user notice differences between self-perception and others' perception.
- Keep the section curious, not corrective.

Data source:

- `perceptionGap.summary`
- `perceptionGap.items`

Each gap item should display:

- `dimension`
- self side
- others side
- `reflection`

Suggested display:

```text
에너지 방향
내가 보는 나: I
타인이 보는 나: E
스스로는 내면에서 정리하고 에너지를 모으는 쪽에 가깝다고 느끼지만, 주변에서는 외부와의 교류나 표현 모습이 더 보일 수 있습니다.
```

Dimension labels:

- `energy`: `에너지 방향`
- `judgment`: `판단 방식`
- `structure`: `생활 리듬과 구조`

Empty state:

- If no gap items:
  - `현재 입력된 MBTI 정보에서는 뚜렷한 인식 차이를 표시하지 않습니다.`

Do not imply:

- one side is correct
- the user is inconsistent
- others know the user better

### 7. Reflection Prompts

Purpose:

- Give the user a concrete next step.
- Make the report interactive in spirit even before AI chat is built.

Data source:

- `reflectionPrompts`

Each prompt should display:

- prompt text
- optional small label from `category`
- optional source reference hidden in debug/admin mode only

Suggested grouping:

- `derived_trait`: `내 신호 돌아보기`
- `perception_gap`: `인식 차이 돌아보기`

Example:

```text
사람들과의 관계에서 자연스럽게 거리를 두게 되는 순간은 언제인가요?
```

UI idea:

- Numbered list of 3-7 prompts.
- Later: allow user to save answers or start AI conversation from a prompt.

### 8. Growth Direction Placeholder

Purpose:

- Reserve space for later non-clinical growth guidance.
- Keep v1 honest if backend `growthDirection` is empty.

Current v1 behavior:

- Backend returns `growthDirection: []`.
- Frontend should show either an empty state or a short placeholder.

Suggested placeholder:

```text
다음 단계에서는 이 신호들을 바탕으로 나에게 맞는 성장 방향과 실천 질문을 더 구체화할 예정입니다.
```

Future content may include:

- short headline
- 2-4 practical suggestions
- linked reflection prompts
- AI conversation starter

Do not show:

- treatment plans
- prescriptions
- risk categories

### 9. AI Conversation Guide

Purpose:

- Invite the user to continue reflection with AI later.
- Make clear that AI is a guide for thinking, not a clinician.

Suggested content:

- "이 질문으로 AI와 대화하기" starter section.
- Show 2-3 suggested conversation starters based on reflection prompts.

Example starters:

```text
이 리포트에서 가장 공감되는 신호를 함께 정리해 보고 싶어요.
내가 보는 나와 타인이 보는 나의 차이에 대해 더 이야기해 보고 싶어요.
관계에서 조심스러워지는 순간을 어떻게 이해하면 좋을지 질문하고 싶어요.
```

Data source:

- `reflectionPrompts`
- `derivedTraits`
- `perceptionGap`

Safety copy:

```text
AI 대화는 자기이해를 돕기 위한 대화이며, 진단이나 치료를 대신하지 않습니다.
```

### 10. Download / Export Section

Purpose:

- Prepare for later PDF/download/share features.
- Make export expectations clear.

Suggested content:

- Download button placeholder.
- Export includes user-facing report content only.
- Admin/debug JSON should not be included in user export.

Future button labels:

- `PDF로 저장`
- `리포트 요약 다운로드`
- `질문 목록 저장`

## 5. What Each Section Should Display

| Section | Display | Source |
| --- | --- | --- |
| Cover / title | title, subject, date, report type | `subject` |
| Notice | self-reflection disclaimer | `safety` |
| Personal snapshot | subject, MBTI, counts | `subject`, `mbtiPerception`, arrays |
| HTP core signals | derived trait cards, HTP summary | `derivedTraits`, `htp.narrative.overall` |
| MBTI comparison | self and others values | `mbtiPerception` |
| Perception gap | dimension gap cards | `perceptionGap` |
| Reflection prompts | prompt list | `reflectionPrompts` |
| Growth direction | placeholder in v1 | `growthDirection` |
| AI conversation guide | suggested starters | `reflectionPrompts`, future AI feature |
| Download/export | placeholder actions | future export feature |

## 6. Tone and Wording Rules

Use:

- `경향`
- `신호`
- `가능성`
- `돌아볼 지점`
- `함께 살펴볼 부분`
- `현재 상황과 연결해 볼 수 있음`

Avoid:

- `진단`
- `장애`
- `치료`
- `위험군`
- `정상/비정상`
- `반드시`
- `원인`
- `예측`

Preferred style:

- "이런 가능성을 돌아볼 수 있습니다."
- "이 신호는 최근 상황과 함께 살펴볼 만합니다."
- "내가 보는 나와 주변에서 보는 나 사이에 차이가 있을 수 있습니다."

Avoid style:

- "당신은 이런 사람입니다."
- "이 점수는 문제가 있다는 뜻입니다."
- "이 유형 때문에 이런 행동을 합니다."

## 7. What Should Be Hidden From Users

Hide by default:

- `schemaVersion`
- `source.basicReportShape`
- `source.generatedAt`
- internal ids unless needed for debug
- raw payload JSON
- `htp.raw`
- raw `sourceScores.path`
- database ids
- scoring formulas
- internal safety flags
- empty backend placeholders if they add no user value

May be visible in admin/debug only:

- full payload JSON
- trait ids
- source score paths
- schema version
- generated timestamp

Never show in user report:

- passwords/auth data
- raw analysis rule internals
- `mde_sketchbook_analysis.sa_value`
- `mde_sketchbook_item.si_value`
- serialized legacy scoring logic

## 8. What Should Be Downloadable Later

User-facing export should include:

- cover/title
- subject summary
- self-reflection notice
- HTP core signal cards
- MBTI self/others section
- perception gap section
- reflection prompts
- growth direction when implemented
- AI conversation guide prompts

User-facing export should not include:

- full JSON payload
- internal field names
- internal ids
- raw score tables unless product intentionally adds an appendix
- debug/admin metadata

Possible export formats:

- PDF report
- short summary PDF
- reflection prompt worksheet
- AI conversation starter sheet

## 9. Difference Between Basic Report and Premium Report

| Area | Basic Report | Premium Report v1 |
| --- | --- | --- |
| Purpose | Show HTP report results | Help user reflect on HTP + self/social perception |
| Data | HTP only | HTP + MBTI perception + derived reflection structures |
| MBTI | Not shown | Shown as optional perception context |
| Derived traits | Not shown | Shown as reflective hypotheses |
| Perception gap | Not shown | Shown when self/others MBTI dimensions differ |
| Reflection prompts | Section detail only / limited | Central part of report experience |
| Tone | Report/score oriented | Personal mirror / guided reflection |
| Safety | Basic report context | Stronger self-reflection positioning |
| Endpoint | `/report/:id` | future premium route using premium payload |

Important boundary:

- Do not add MBTI to the basic report.
- Do not change `/report/:id` to support premium content.
- Build premium UI as a separate route/product surface.

## 10. Future Expansion Notes

Frontend implementation:

- Add a separate premium report route, not inside `/report/:id`.
- Use the admin preview page only for inspection, not final UX.
- Build user-facing components around sections listed above.
- Keep empty states gentle.

Backend expansion:

- Fill `growthDirection` with non-clinical suggestions.
- Add optional AI conversation starter payload.
- Add user reflection answer storage if the premium report becomes interactive.
- Add export endpoint only after user-facing content is finalized.

Product expansion:

- Allow users to answer reflection prompts.
- Let users start an AI conversation from a selected prompt.
- Add a downloadable reflection worksheet.
- Add a premium summary page separate from full report.

Safety expansion:

- Add copy review for all premium report text.
- Add policy for serious distress or crisis language in future AI conversations.
- Keep professional support language broad and careful.

Design expansion:

- Premium visual tone should be calm, spacious, and editorial.
- Avoid clinical charts as the primary experience.
- Use scores as supporting context, not the emotional center of the page.
