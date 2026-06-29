# Routing URL Policy

This document defines the current canonical URL policy for the HTP website. It is intentionally conservative: existing aliases may remain available until they are explicitly deprecated and removed.

## 1. Principles

- Basic report routes stay separate from premium report routes.
- Basic `/report/:sbId` remains HTP-only and must not receive premium, MBTI, LLM, or similar-flow content.
- Member-facing premium routes use `/premium-report/...` in the frontend and `/premium-reports/...` in the backend API.
- Admin pages live under `/admin/...`.
- QA/design routes may exist, but should not be linked from normal member flows.
- Frontend pages should not mirror backend API paths unless the route is clearly admin/debug oriented.
- Route aliases should be removed only after links, docs, scripts, and admin workflows have been checked.

## 2. Canonical Frontend Routes

| Area | Canonical route | Notes |
|---|---|---|
| Basic member report | `/report/:sbId` | Legacy/basic HTP-only report. |
| Basic print report | `/report/:sbId/print` | Print version of basic report. |
| Premium member report | `/premium-report/:sbNo` | Latest generated premium narrative report. |
| Premium member version | `/premium-report/:sbNo/versions/:prNo` | Specific saved premium report version. |
| Premium print report | `/premium-report/:sbNo/print` and `/premium-report/:sbNo/versions/:prNo/print` | Print views for premium reports. |
| My reports | `/my/reports` | Member report dashboard entry point. |
| Admin members | `/admin/members` | Canonical member search/list route. |
| Admin member sketchbooks | `/admin/members/:mbNo/sketchbooks` | Member-specific sketchbook list. |
| Admin all sketchbooks | `/admin/sketchbooks` | Admin-wide sketchbook list. |
| Admin premium history | `/admin/premium-reports/:sbNo/history` | Canonical admin premium report history route. |
| Premium mock | `/premium-report/mock` | QA/design route only. Keep before `/premium-report/:sbNo`. |
| Sample report | `/sample-report` | QA/sample route only. |

## 3. Current Transitional Aliases

The following aliases are retained for compatibility. Do not create new links to them unless there is a specific admin/debug reason.

| Alias | Prefer | Reason |
|---|---|---|
| `/admin/search` | `/admin/members` | Older member-search alias. |
| `/admin/premium-preview/:sbNo/history` | `/admin/premium-reports/:sbNo/history` | Older premium history alias. |
| `/admin/premium-preview/:sbNo` | Undecided admin payload preview route | Keep until premium payload preview naming is finalized. |
| `/admin/reports/:sbNo/premium-payload` | Undecided admin payload preview route | Mirrors backend API naming and should not become a normal member-facing URL. |

## 4. Backend API Naming

Backend API endpoints are not user-facing URLs. They may use plural resource names such as:

- `GET /premium-reports/:sbNo`
- `GET /premium-reports/:sbNo/versions/:prNo`
- `GET /premium-reports/:sbNo/similar-flow-map`
- `POST /admin/premium-reports/:sbNo/generate`
- `GET /admin/premium-reports/:sbNo/latest`
- `GET /admin/premium-reports/:sbNo/history`
- `GET /admin/reports/:sbNo/premium-payload`

Frontend route names should prioritize product clarity over API mirroring.

## 5. Deprecation Checklist

Before removing any alias route:

- Search frontend router links and programmatic navigation.
- Search docs and scripts for direct browser URLs.
- Check whether admin workflows or bookmarks use the alias.
- Keep a redirect or alias for at least one release if the route was previously linked.
- Run frontend build after route updates.

## 6. Future URL Work

The planned member dashboard and stable user-only premium report URL should be designed separately. Do not overload the current admin preview or backend API route names for that future member experience.
