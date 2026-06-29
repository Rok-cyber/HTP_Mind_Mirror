# HTP Section Writing Patterns

## 1. Purpose

This document defines practical writing patterns for HTP Premium Report sections.

The problem this document solves:

```text
The report is safe, but sometimes too indirect.
The user may understand that the tone is gentle, but not immediately understand what the report is saying.
```

The goal is:

```text
Clear first, gentle second.
```

Premium report writing should be:

- easy to understand
- emotionally safe
- direct enough to feel useful
- reflective rather than diagnostic
- concrete enough to feel personal
- warm without becoming vague

This public document does not expose or change:

- score calculation
- score thresholds
- signalStrength semantics
- pattern detection
- archetype detection
- DB schema
- backend routes
- frontend routes
- payload schema

Use this with:

- `docs/tone-system/htp-global-tone-rules.md`
- private backend scoring and generation rules

## 2. Global Rule: Clear First, Gentle Second

The report should not hide the main point behind too much caution.

Bad pattern:

```text
There may be a possibility that, depending on the context, some relational flow could be interpreted as somewhat cautious.
```

Better pattern:

```text
관계가 불편해질수록 바로 말하기보다 잠시 거리를 두는 흐름이 보입니다.
다만 이것이 관계를 피하고 싶다는 뜻은 아니며, 마음을 정리할 시간이 필요하다는 신호일 수 있습니다.
```

Writing order:

1. Say the main observed flow clearly.
2. Add a gentle non-diagnostic boundary.
3. Give one concrete life example.
4. Invite reflection.

Formula:

```text
핵심 흐름 -> 안전한 맥락 -> 생활 장면 -> 돌아볼 질문
```

## 3. Sentence-Level Formula

### Default Paragraph Formula

Use this for most narrative paragraphs:

```text
이번 결과에서는 {main_flow} 흐름이 보입니다.
이 흐름은 {safe_meaning}로 이해해 볼 수 있습니다.
생활에서는 {life_example}처럼 나타날 수 있습니다.
그래서 {reflection_point}를 함께 돌아보면 좋습니다.
```

Example:

```text
이번 결과에서는 관계 긴장이 생길 때 바로 부딪히기보다 거리를 두는 흐름이 보입니다.
이 흐름은 관계를 끊고 싶다는 뜻이라기보다, 불편함을 혼자 정리하려는 방식으로 이해해 볼 수 있습니다.
생활에서는 대화가 무거워질수록 답장을 늦추거나, 먼저 마음을 가라앉힌 뒤 말하고 싶어지는 장면으로 나타날 수 있습니다.
그래서 어떤 순간에 거리가 회복을 돕고, 어떤 순간에는 오해를 키우는지 함께 돌아보면 좋습니다.
```

### Short Card Formula

Use this for cards, chips, and compact UI blocks:

```text
{main_flow}이 보입니다.
{life_context}에서 더 두드러질 수 있습니다.
```

Example:

```text
관계 긴장이 커질수록 거리를 두는 흐름이 보입니다.
오해가 반복되거나 감정을 바로 말하기 어려운 장면에서 더 두드러질 수 있습니다.
```

### Safety Boundary Formula

Use this when a sentence could sound too fixed:

```text
이것은 {fixed_claim}이라는 뜻이 아니라, {reflective_meaning}로 읽는 것이 안전합니다.
```

Example:

```text
이것은 관계를 피하는 사람이라는 뜻이 아니라, 긴장이 생길 때 마음을 먼저 보호하려는 흐름으로 읽는 것이 안전합니다.
```

## 4. Avoid Over-Softening

Over-softening makes copy hard to understand.

Avoid stacking too many softeners:

- 어쩌면
- 다소
- 어느 정도
- 가능성이 있을 수 있습니다
- 맥락에 따라
- 살펴볼 수도 있습니다

Use one softener, then say the point.

Bad:

```text
관계 장면에서 어느 정도 조심스러운 경향이 나타날 가능성이 있을 수 있습니다.
```

Better:

```text
관계 장면에서 조심스럽게 거리를 두는 흐름이 보입니다.
```

Bad:

```text
감정적으로 부담이 될 수 있는 요소들이 여러 맥락에서 다소 관찰될 수 있습니다.
```

Better:

```text
최근 감정 에너지가 쉽게 무거워지거나 지치는 흐름이 보입니다.
```

## 5. Section-Specific Patterns

## Overall Summary

Role:

- Give the user the main report story quickly.
- Avoid listing every feature.
- Connect HTP, patterns, resources, and MBTI if available.

Length:

- 2 to 4 short paragraphs.
- Each paragraph should have one job.

Formula:

```text
Paragraph 1: main HTP flow
Paragraph 2: pattern hierarchy
Paragraph 3: resource or balance context
Paragraph 4: optional MBTI comparison and reflection invitation
```

Prompt-ready instruction:

```text
Start the overall summary with the clearest current HTP flow. Do not begin with abstract safety language. Add safety through wording, not by avoiding the main point.
```

Bad:

```text
이번 리포트는 여러 신호를 종합적으로 고려하여 현재 마음의 다양한 가능성을 조심스럽게 살펴보는 데 도움을 줄 수 있습니다.
```

Better:

```text
이번 결과에서는 관계 긴장이 생길 때 바로 표현하기보다 잠시 거리를 두고 마음을 정리하려는 흐름이 중심에 놓입니다.
```

## Archetype Section

Role:

- Name the dominant HTP/pattern flow.
- Make the hierarchy understandable.
- Avoid making archetype sound like fixed identity.

Formula:

```text
이번 결과에서 중심에 놓인 흐름은 {archetype_name}으로 정리해 볼 수 있습니다.
이 이름은 성격 유형이 아니라, {top_patterns} 같은 패턴이 함께 나타날 때 붙이는 요약 이름입니다.
생활에서는 {life_example}처럼 느껴질 수 있습니다.
```

Good wording:

```text
이번 결과에서 중심에 놓인 흐름은 관계 에너지 조절형으로 정리해 볼 수 있습니다.
이 이름은 성격 유형이 아니라, 관계 긴장 회피와 외부활동 vs 관계피로 같은 패턴이 함께 나타날 때 붙이는 요약 이름입니다.
생활에서는 사람들과 연결되고 싶지만, 관계 에너지가 빨리 소진될 때 잠시 혼자 정리할 시간이 필요해지는 장면으로 느껴질 수 있습니다.
```

Avoid:

```text
당신은 관계 에너지 조절형입니다.
```

Use:

```text
이번 결과에서는 관계 에너지 조절형 흐름이 중심에 놓입니다.
```

## Pattern Section

Role:

- Explain pattern as feature combination.
- Translate features into everyday scenes.
- Keep pattern as reflective material, not diagnosis.

Formula:

```text
{pattern_name}은 {feature_a}와 {feature_b} 신호가 함께 보일 때 살펴볼 수 있는 흐름입니다.
핵심은 {plain_meaning}입니다.
생활에서는 {life_example_1} 또는 {life_example_2}처럼 나타날 수 있습니다.
이 흐름을 볼 때는 {reflection_question}를 함께 물어보는 것이 좋습니다.
```

Example:

```text
관계 긴장 회피는 위축과 갈등 신호가 함께 보일 때 살펴볼 수 있는 흐름입니다.
핵심은 관계가 불편해질수록 바로 부딪히기보다 잠시 거리를 두려는 반응입니다.
생활에서는 대화를 미루거나, 마음이 정리된 뒤에야 표현하고 싶어지는 장면으로 나타날 수 있습니다.
이 흐름을 볼 때는 "나는 어떤 순간에 거리가 필요하고, 어떤 순간에는 짧은 표현이 필요할까?"를 함께 물어보는 것이 좋습니다.
```

Bad:

```text
이 패턴은 관계 문제와 회피 성향을 의미합니다.
```

Better:

```text
이 패턴은 관계 긴장을 바로 마주하기보다, 먼저 마음을 보호하고 정리하려는 흐름으로 읽을 수 있습니다.
```

## Resource Card Section

Role:

- Show stabilizing resources.
- Balance tension patterns without erasing them.
- Avoid "positive card vs negative card" framing.

Formula:

```text
긴장 흐름만 있는 것은 아닙니다.
이번 결과에서는 {resource_name} 같은 자원 흐름도 함께 살펴볼 수 있습니다.
이 자원은 {supportive_function}을 도울 수 있습니다.
```

Example:

```text
긴장 흐름만 있는 것은 아닙니다.
이번 결과에서는 관계 안정 흐름도 함께 살펴볼 수 있습니다.
이 자원은 관계에서 무리하게 가까워지거나 멀어지기보다, 편안한 거리를 유지하려는 균형감을 도울 수 있습니다.
```

Avoid:

```text
이 카드는 좋은 카드입니다.
이 자원이 있으니 긴장 패턴은 크게 걱정하지 않아도 됩니다.
```

Use:

```text
이 자원은 긴장 흐름을 없애는 것이 아니라, 그 흐름을 조금 더 부드럽게 다룰 수 있는 맥락을 더해줍니다.
```

## MBTI Comparison Section

Role:

- Compare self-perception and others-perception.
- Keep HTP primary.
- Avoid MBTI as truth.

Formula:

```text
MBTI 정보는 성격의 정답이 아니라, 내가 보는 나와 주변에서 보는 나를 비교하는 보조 맥락입니다.
HTP에서는 {htp_flow}가 보이고, MBTI에서는 {mbti_context}가 함께 놓입니다.
이 둘을 함께 보면 {safe_comparison}를 돌아볼 수 있습니다.
```

Example:

```text
MBTI 정보는 성격의 정답이 아니라, 내가 보는 나와 주변에서 보는 나를 비교하는 보조 맥락입니다.
HTP에서는 관계 긴장이 생길 때 거리를 두는 흐름이 보이고, MBTI에서는 스스로와 주변 모두 ENTJ로 인식하는 정보가 함께 놓입니다.
이 둘을 함께 보면 겉으로는 분명하고 주도적으로 보이더라도, 관계 장면에서는 에너지를 조절하려는 흐름이 함께 있을 수 있음을 돌아볼 수 있습니다.
```

Avoid:

```text
ENTJ이기 때문에 관계 에너지 조절형이 나타납니다.
```

Better:

```text
ENTJ 인식은 참고 맥락일 뿐이며, 관계 에너지 조절형 흐름은 HTP 패턴을 중심으로 정리됩니다.
```

## Reflection Questions

Role:

- Help the user apply the report to their own life.
- Avoid yes/no or self-blaming questions.

Good question patterns:

```text
나는 어떤 장면에서 {pattern}이 더 두드러질까?
이 흐름이 나를 보호해 준 순간은 언제였을까?
반대로 이 흐름이 오해를 만든 순간은 있었을까?
최근 상황과 연결해 보면, 어떤 작은 표현부터 시도해 볼 수 있을까?
```

Avoid:

```text
나는 왜 이렇게 회피적일까?
나는 문제가 있는 걸까?
나는 이 성향을 어떻게 고쳐야 할까?
```

Better:

```text
나는 어떤 상황에서 바로 말하기보다 먼저 마음을 정리하고 싶어질까?
그 시간이 나를 도와줄 때와, 관계를 더 어렵게 만들 때는 어떻게 다를까?
```

## Growth Direction

Role:

- Offer a next reflection direction.
- Keep practical but not prescriptive.

Formula:

```text
이 흐름을 바꾸려 하기보다, 먼저 언제 도움이 되고 언제 부담이 되는지 구분해 보는 것이 좋습니다.
작게는 {small_experiment}부터 시작해 볼 수 있습니다.
```

Examples:

```text
감정을 모두 정리한 뒤에만 말하려 하기보다, "지금 바로 답하기는 어렵지만 다시 이야기하고 싶어"처럼 짧은 표현부터 시도해 볼 수 있습니다.
```

```text
관계 에너지가 소진되기 전에 혼자 회복할 시간을 미리 확보하는 것도 도움이 될 수 있습니다.
```

Avoid:

```text
회피를 고쳐야 합니다.
더 적극적으로 대화해야 합니다.
```

Better:

```text
거리가 필요한 순간을 알아차리되, 오해를 줄일 수 있는 짧은 표현을 함께 연습해 볼 수 있습니다.
```

## Conversation Starters

Role:

- Help the user continue reflection in chat or journaling.
- Make the report feel usable after reading.

Good starters:

```text
이 리포트에서 가장 공감되는 흐름을 함께 정리해보고 싶어요.
관계에서 거리를 두게 되는 순간을 더 구체적으로 돌아보고 싶어요.
내가 가진 자원 흐름이 긴장 패턴을 어떻게 도와주는지 이야기해보고 싶어요.
```

Avoid:

```text
내 심리 문제의 원인을 분석해줘.
내가 어떤 사람인지 확실히 말해줘.
```

## 6. BAD / BETTER Conversion Bank

| Problem | BAD | BETTER |
| --- | --- | --- |
| Too vague | 여러 관계적 가능성이 복합적으로 나타날 수 있습니다. | 관계가 불편해질수록 바로 말하기보다 잠시 거리를 두는 흐름이 보입니다. |
| Too deterministic | 당신은 갈등을 피하는 사람입니다. | 이번 결과에서는 갈등이 예상될 때 먼저 마음을 정리하려는 흐름이 보입니다. |
| Too clinical | 대인관계 문제가 있습니다. | 관계 장면에서 긴장이 쌓일 때 표현이 조심스러워질 수 있습니다. |
| Too score-heavy | 갈등 점수가 높기 때문에 문제가 큽니다. | 갈등 신호가 조금 더 두드러져, 관계 속 불편함을 어떻게 다루는지 살펴볼 만합니다. |
| MBTI override | ENTJ라서 주도성과 갈등 회피가 함께 나타납니다. | ENTJ 인식은 참고 맥락이며, 이번 흐름은 HTP에서 보이는 관계 긴장과 표현 에너지를 중심으로 읽습니다. |
| Over-softened | 어떤 상황에서는 다소 거리감이 있을 가능성도 배제할 수 없습니다. | 어떤 관계 장면에서는 바로 가까워지기보다 편안한 거리를 먼저 확보하려는 흐름이 보입니다. |
| Too prescriptive | 먼저 연락하고 대화를 피하지 마세요. | 바로 말하기 어렵다면, 짧은 확인 표현부터 시도해 볼 수 있습니다. |
| Resource overclaim | 자원이 있으니 긴장 패턴은 괜찮습니다. | 자원 흐름은 긴장을 없애기보다, 그 긴장을 더 부드럽게 다룰 수 있는 맥락을 더해줍니다. |

## 7. Prompt-Ready Section Instruction

Use this block when updating LLM prompt templates:

```text
Write each section with the rule "clear first, gentle second."

For every major section:
1. Start with the clearest backend-provided current flow.
2. Add a non-diagnostic boundary without hiding the main point.
3. Give one concrete everyday example when pattern enrichment is available.
4. End with a reflection point or question.

Avoid vague stacked softeners such as "어느 정도", "다소", "가능성이 있을 수 있습니다" unless needed.
Use one softener, then state the point clearly.

Do not say "당신은 ~입니다."
Use "이번 결과에서는 ~ 흐름이 보입니다" or "현재 관찰되는 흐름으로는 ~를 살펴볼 수 있습니다."

Do not make the report feel clinical, diagnostic, score-heavy, or evasive.
The user should understand the main point in the first sentence of each section.
```

## 8. Section QA Checklist

Before accepting a generated or deterministic section, check:

- [ ] Does the first sentence say the main point clearly?
- [ ] Is the safety boundary present but not dominant?
- [ ] Does the section avoid stacked softeners?
- [ ] Is there at least one concrete everyday scene when enough data exists?
- [ ] Does it avoid "당신은 ~입니다" identity wording?
- [ ] Does it avoid diagnosis, treatment, pathology, and causality?
- [ ] Does it keep HTP primary and MBTI secondary?
- [ ] Does it avoid using score numbers as the emotional center?
- [ ] Does it explain patterns as feature combinations when needed?
- [ ] Does it keep archetypes as flow summaries?
- [ ] Does it use resource cards as balance context, not positive labels?
- [ ] Does it invite reflection instead of prescribing behavior?
- [ ] Would a user understand the point without rereading three times?

## 9. Final Writing Principle

The report should be gentle, but not evasive.

The best HTP premium sentence usually does three things:

```text
It names the flow.
It keeps the user safe from fixed judgment.
It gives the user one concrete way to recognize the flow in life.
```

Final model:

```text
관계가 불편해질수록 바로 말하기보다 잠시 거리를 두는 흐름이 보입니다.
이것은 관계를 피하는 사람이라는 뜻이 아니라, 마음을 먼저 정리하려는 방식일 수 있습니다.
최근 장면과 연결해 보면, 어떤 순간에 거리가 회복을 돕고 어떤 순간에는 오해를 키우는지 돌아볼 수 있습니다.
```
