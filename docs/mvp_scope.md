# MVP Scope

## 1. Purpose

이 문서는 HTP 웹사이트의 MVP 범위를 정리합니다.

현재 프로젝트는 초기 목표였던 **기본 HTP 결과 조회 MVP**를 완료했고, 그 위에 **프리미엄 리포트 내부 MVP**까지 확장된 상태입니다.

따라서 MVP는 두 층으로 나누어 봅니다.

```text
Basic MVP
= 기존 HTP 결과를 현대적인 UI로 조회하는 기능

Premium Internal MVP
= 저장 가능한 AI-assisted 자기성찰 리포트를 생성/조회/렌더링하는 기능
```

---

## 2. Basic MVP — 완료

초기 MVP 목표:

> 유저의 기존 HTP 결과를 현대적인 UI로 보여주는 웹 플랫폼

### In Scope

- 유저 로그인/조회
- 스케치북/리포트 조회
- 이미지 표시
- 기존 결과 점수 표시
- 기존 해석 텍스트 표시
- 차트와 섹션 UI
- 관리자 기본 조회 화면

### Out of Scope

- 분석 엔진 재구현
- CV 자동 판독
- 결제
- 프리미엄 생성
- AI 자동 판독

### Status

Basic MVP는 완료로 봅니다.

근거:

- `/report/:sbId` 라우트가 존재합니다.
- 기존 HTP 이미지, 점수, 섹션 텍스트를 표시합니다.
- 기본 리포트는 HTP-only 원칙을 유지합니다.
- 프리미엄/MBTI/LLM 정보는 기본 리포트에 섞지 않습니다.

---

## 3. Premium Internal MVP — 1차 완료

프리미엄 내부 MVP 목표:

> 기존 HTP 결과를 기반으로 PremiumNarrativeReport를 생성하고, DB에 저장한 뒤, 최신/버전별로 다시 열람할 수 있게 만드는 것

### Completed Scope

- premium payload 생성
- LLM report input 구성
- OpenAI/mock provider 기반 프리미엄 리포트 생성
- `PremiumNarrativeReport` v1.2 schema
- `resourceSection` 포함
- `mde_premium_report` 저장
- admin generate/latest/history endpoint
- member-facing latest/version read endpoint
- `/premium-report/:sbNo` 최신 리포트 라우트
- `/premium-report/:sbNo/versions/:prNo` 특정 버전 라우트
- `/admin/premium-reports/:sbNo/history` history 라우트
- shared `PremiumReportRendererComponent`
- archetype/fallback hero block
- pattern/balance card gallery
- QA checker / batch audit script

### Status

Premium Internal MVP는 1차 완료로 봅니다.

완료의 의미:

- 생성 → 저장 → 재열람 → 렌더링 흐름이 작동합니다.
- 프리미엄 리포트가 더 이상 tmp/mock 파일에만 의존하지 않습니다.
- 패턴-아키타입 히어로와 균형 단서 카드가 프리미엄 리포트 진입점으로 동작합니다.

---

## 4. Product MVP — 남은 범위

상용 또는 외부 사용자용 MVP로 보려면 아직 다음 항목이 남아 있습니다.

### Required Before Product MVP

- 결제/권한 unlock 정책
- 사용자-facing 프리미엄 생성 요청 플로우
- 생성 실패/대기/미구매 상태 UX
- PDF/export
- 운영용 admin regenerate/retry UX
- 10~15개 이상 batch generation + QA + human rating 기준 통과
- 최종 prompt/provider 품질 기준

### Nice To Have After Product MVP

- OpenAI/Gemini provider 비교
- report comparison over time
- user feedback 저장
- similar-user/RAG/vector section
- cohort-level distribution analytics

---

## 5. Current MVP Decision

현재 상태는 다음처럼 정리합니다.

| Scope | Status |
|---|---|
| Basic HTP report MVP | 완료 |
| Premium internal MVP | 1차 완료 |
| Premium visual hero/card layer | 완료 |
| Premium persistence/read flow | 완료 |
| Product/payment MVP | 미완 |
| PDF/export | 미완 |
| Similar-user/RAG/vector | 미완 |

---

## 6. Guardrails

MVP 이후 작업에서도 다음 원칙은 유지합니다.

- 기본 `/report/:sbId`는 HTP-only로 유지합니다.
- HTP score calculation과 threshold를 임의로 바꾸지 않습니다.
- DB schema 변경은 명확한 구현 단계에서만 진행합니다.
- MBTI는 premium context일 뿐 HTP를 override하지 않습니다.
- LLM은 narrative rendering 역할이며 심리 로직을 새로 만들지 않습니다.
- user-facing 문장은 비진단적 자기성찰 톤을 유지합니다.

