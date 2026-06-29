# Site Map

## 1. Public / Auth

| Route | Purpose |
|---|---|
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/sample-report` | 샘플 리포트 |
| `/` | 로그인으로 redirect |

---

## 2. Member Routes

| Route | Purpose |
|---|---|
| `/my/reports` | 내 리포트 목록 |
| `/report/:sbId` | 기본 HTP 리포트 |
| `/report/:sbId/sections/:sectionKey` | 기본 리포트 섹션 상세 |
| `/premium-report/:sbNo` | 최신 저장 프리미엄 리포트 |
| `/premium-report/:sbNo/versions/:prNo` | 특정 저장 프리미엄 리포트 버전 |
| `/sketchbook/upload` | 스케치북 업로드 |

---

## 3. Premium Development Route

| Route | Purpose |
|---|---|
| `/premium-report/mock` | 정적 mock JSON 기반 프리미엄 리포트 preview |

---

## 4. Admin Routes

| Route | Purpose |
|---|---|
| `/admin/dashboard` | 관리자 대시보드 |
| `/admin/search` | 회원 검색 |
| `/admin/members` | 회원 관리 |
| `/admin/members/:mbNo/sketchbooks` | 회원별 스케치북 |
| `/admin/sketchbooks` | 전체 스케치북 관리 |
| `/admin/sketchbooks/untyped` | 미분류 스케치북 |
| `/admin/sketchbooks/merge-candidates` | 병합 후보 |
| `/admin/sketchbooks/:sbNo/profile` | 스케치북 프로필/MBTI 관리 |
| `/admin/sketchbooks/:sbNo/analyze` | 스케치북 분석 |
| `/admin/sketchbooks/:sbNo/analyze-senior` | senior 분석 |
| `/admin/analysis-items` | 분석 항목 관리 |
| `/admin/analysis-items/new` | 분석 항목 생성 |
| `/admin/analysis-items/:siNo/edit` | 분석 항목 수정 |

---

## 5. Admin Premium Routes

| Route | Purpose |
|---|---|
| `/admin/premium-preview/:sbNo` | premium payload preview |
| `/admin/premium-preview/:sbNo/history` | premium report history view |
| `/admin/premium-reports/:sbNo/history` | premium report history view |
| `/admin/reports/:sbNo/premium-payload` | legacy premium payload route |

---

## 6. Route Guard Rules

- Member report routes use `authGuard`.
- Admin routes use `adminGuard`.
- `/premium-report/mock` is development-only and currently unguarded.
- Basic `/report/:sbId` remains separate from premium report routes.

