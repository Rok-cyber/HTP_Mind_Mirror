# API Spec

## 1. Basic Report

### `GET /report/:sbId`

Purpose:

- Return the existing HTP report response.
- Used by the basic `/report/:sbId` frontend page.
- Must remain HTP-only.

Rules:

- Do not add premium narrative fields here.
- Do not add MBTI comparison here.
- Do not expose premium payload, LLM input, provider metadata, or debug fields.

High-level response shape:

```json
{
  "info": {},
  "images": [],
  "emotion": {},
  "adaptation": {},
  "relationship": {},
  "tendency": {},
  "raw": {},
  "summary": "...",
  "details": {}
}
```

Notes:

- Backend applies the existing score/display logic.
- Frontend uses display scores and raw values for charts/highlights.
- This route is not the premium report route.

---

## 2. Member Premium Report

### `GET /premium-reports/:sbNo`

Purpose:

- Return latest saved user-visible premium report for a sketchbook.

Access:

- owner or admin

Behavior:

- Read-only.
- Does not generate a new report.
- Excludes mock provider rows for normal user-facing flow.
- Does not return usage/cost/sourceInputMeta/raw prompt.

Response:

```json
{
  "ok": true,
  "record": {
    "prNo": 7,
    "sbNo": 8169,
    "schemaVersion": "premium-narrative-report-v1.2",
    "provider": "openai",
    "model": "gpt-5-mini",
    "status": "generated",
    "generatedAt": "..."
  },
  "report": {}
}
```

### `GET /premium-reports/:sbNo/versions/:prNo`

Purpose:

- Return one specific saved premium report version.

Access:

- owner or admin

Behavior:

- Read-only.
- Normal members can access only generated non-mock rows.
- Admin may inspect mock/openai rows through this endpoint.
- Does not return usage/cost/sourceInputMeta/raw prompt.

---

## 3. Admin Premium Report

### `POST /admin/premium-reports/:sbNo/generate`

Purpose:

- Generate and save a premium report.

Access:

- admin only

Behavior:

- Supports provider `openai` and `mock`.
- Real OpenAI generation remains explicit/opt-in.
- If `force !== true` and a latest generated report exists, reuse latest.
- If `force === true`, generate a new row.
- Saves generated or failed row to `mde_premium_report`.

Admin response may include usage metadata, but must not expose raw prompt/input by default.

### `GET /admin/premium-reports/:sbNo/latest`

Purpose:

- Return latest saved premium report for admin inspection.

Access:

- admin only

Behavior:

- May include usage metadata.
- Does not return raw prompt/input.

### `GET /admin/premium-reports/:sbNo/history`

Purpose:

- List saved premium report rows for one sketchbook.

Access:

- admin only

Behavior:

- Returns metadata summaries.
- May include usage summary.
- Does not return full `report_json`.
- Does not return raw prompt/input/sourceInputMeta.

---

## 4. Admin Premium Payload

Existing admin premium preview routes are internal/debug tooling.

Rules:

- Do not expose raw debug payload to normal members.
- Keep this separate from member-facing premium report routes.
- Use only for admin inspection and development.

---

## 5. Global API Guardrails

- Basic `/report/:sbId` remains unchanged and HTP-only.
- Premium read endpoints are separate.
- Generation endpoints are admin-only.
- Member-facing premium endpoints do not expose usage/cost/debug metadata.
- Raw prompt and raw LLM input are not user-facing.
- Score calculation, score thresholds, and pattern/archetype logic are backend-controlled.

