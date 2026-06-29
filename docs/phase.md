# HTP AI Project Roadmap

## 1. Overview

이 프로젝트는 legacy HTP 심리검사 플랫폼을 현대적인 **AI-assisted self-understanding report system**으로 확장하는 작업입니다.

핵심 전략:

- legacy DB, 이미지, 결과, 해석 텍스트를 보존합니다.
- 기존 분석 엔진을 현재 단계에서 재구축하지 않습니다.
- structured data를 먼저 만들고, 그 위에 LLM narrative layer를 얹습니다.
- CV 자동 판독은 후순위로 둡니다.
- 기본 리포트와 프리미엄 리포트를 명확히 분리합니다.

---

## 2. Phase Status

| Phase | Name | Status | Notes |
|---:|---|---|---|
| 0 | Direction Definition | 완료 | 기존 시스템 재활용, AI-assisted report 방향 확정 |
| 1 | Legacy System Understanding | 완료 | DB/image/result 구조 파악 |
| 2 | Basic Read-Only MVP | 완료 | `/report/:sbId` 기본 HTP 리포트 구현 |
| 3 | Structured Dataset / Premium Payload | 완료 | premium payload, canonical feature, LLM input 구성 |
| 4 | LLM Premium Narrative | 완료 | OpenAI/mock provider 기반 PremiumNarrativeReport 생성 |
| 5 | Explainable Pattern / Archetype Layer | 완료 | pattern, strength, resource, archetype, fallback hero |
| 6 | Premium Persistence / Retrieval | 완료 | `mde_premium_report`, latest/version/history |
| 7 | QA / Batch Evaluation | 진행 중 | QA checker, batch generation, human rating flow |
| 8 | Productization | 예정 | payment, permission, PDF/export, production UX |
| 9 | Similar Users / RAG / Vector | 예정 | embedding/cohort 기반 비교 섹션 |
| 10 | Computer Vision | 후순위 | 이미지에서 feature 자동 추출 |

---

## 3. Completed Phases

### Phase 0 — Direction Definition

완료된 결정:

- legacy analysis engine을 재구축하지 않습니다.
- 기존 DB/result/image를 보존합니다.
- HTP를 primary interpretation source로 유지합니다.
- AI는 해석 로직을 발명하는 것이 아니라 narrative rendering을 담당합니다.

### Phase 1 — Legacy System Understanding

완료된 내용:

- 주요 legacy table 파악
- sketchbook/result/image 관계 파악
- 기존 이미지 경로와 result data 사용 가능성 검증
- 기존 리포트 구조 확인

### Phase 2 — Basic Read-Only MVP

완료된 내용:

- `/report/:sbId` API/UI
- 이미지 표시
- 기존 점수/섹션 표시
- frontend chart/text UI
- 기본 리포트 HTP-only 원칙 유지

### Phase 3 — Structured Dataset / Premium Payload

완료된 내용:

- premium payload service
- canonical HTP feature registry
- active feature adapter
- LLM report input compression
- MBTI는 optional comparison context로 분리

### Phase 4 — LLM Premium Narrative

완료된 내용:

- OpenAI provider integration
- mock provider test flow
- PremiumNarrativeReport validation
- v1.2 report schema
- `resourceSection` 포함
- prompt template safety/tone guidance

### Phase 5 — Explainable Pattern / Archetype Layer

완료된 내용:

- Adjustment/Tension pattern rules
- Strength/Expression pattern layer
- Resource/Balance pattern layer
- Archetype detector
- Fallback hero detector
- Premium hero/card frontend renderer
- Pattern & Balance card gallery

### Phase 6 — Premium Persistence / Retrieval

완료된 내용:

- `mde_premium_report`
- storage service
- admin generate/latest/history endpoints
- member-facing latest/version endpoints
- frontend latest/version routes
- admin history route

---

## 4. Current Phase — QA / Batch Evaluation

현재는 Phase 7로 봅니다.

목표:

```text
여러 케이스를 반복 생성하고,
QA checker와 human rating으로 리포트 품질을 검증한 뒤,
근거가 있는 경우에만 prompt/copy/rule을 조정한다.
```

현재 완료된 기반:

- Premium Narrative QA checker
- single report audit script
- batch audit script
- batch generation script
- generated report persistence
- version/history comparison 가능

남은 일:

- 10~15개 이상 batch generation 결과 human rating
- QA warning/error 유형별 prompt 개선
- generated report copy fatigue 확인
- provider comparison 준비

---

## 5. Productization Phase

Phase 8은 아직 예정입니다.

주요 작업:

- payment/permission gating
- user-facing premium generation flow
- generation status UX
- retry/regenerate UX
- PDF/export
- product-grade admin tooling
- final QA checklist

---

## 6. Future AI Extensions

### Similar Users / RAG / Vector

프리미엄 리포트가 안정된 뒤에 진행합니다.

가능한 방향:

- similar user section
- cohort-level pattern distribution
- embedding-based report similarity
- consumer insight-style comparison language

주의:

- percentile/similar-user 문구는 진단/정상성 판단처럼 보이면 안 됩니다.
- 충분한 데이터 품질과 privacy policy가 필요합니다.

### Computer Vision

CV 자동 판독은 후순위입니다.

이유:

- feature extraction quality가 가장 어렵습니다.
- gold dataset이 필요합니다.
- 현재 product value는 structured HTP result + narrative layer에서 먼저 나옵니다.

---

## 7. Current Status Summary

```text
Basic MVP: 완료
Premium internal MVP: 완료
Pattern/archetype hero section: 완료
Persistence/version/history: 완료
QA/batch evaluation: 진행 중
Product payment/PDF: 예정
RAG/vector/similar users: 예정
CV automation: 후순위
```

---

## 8. Core Principle

```text
Structured data first
-> explainable pattern/archetype layer
-> LLM narrative rendering
-> persistence and QA
-> productization
-> vector/RAG
-> CV automation
```

CV나 고급 AI 기능보다 먼저, 현재 프리미엄 리포트의 품질과 신뢰도를 안정화합니다.

