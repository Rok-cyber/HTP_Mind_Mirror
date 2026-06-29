# Portfolio Demo Guide

Use this guide when preparing screenshots, sample fixtures, or a short demo video for a public GitHub portfolio.

## Goals

- Show the product clearly within the first minute.
- Demonstrate engineering depth without exposing private data.
- Keep all examples synthetic and non-diagnostic.

## Recommended Demo Scenario

Use one fully synthetic user and one synthetic HTP report:

- User: `Demo User`
- Age: `29`
- MBTI self-report: `ENTJ`
- MBTI others-report: `ENTJ`
- Report theme: relationship energy, achievement pressure, and recovery rhythm
- Uploaded images: placeholders or intentionally generated non-user drawings

Avoid real names, real sketches, real uploaded files, real report rows, real emails, and real API responses.

## Screenshot Set

Capture 3-5 polished screenshots:

1. Member report list or dashboard
2. Basic HTP report page with score/summary sections
3. Premium report hero and overall summary
4. Premium pattern/resource card section
5. Admin premium report history or payload QA page

Recommended folder:

```text
docs/screenshots/
```

Recommended filenames:

```text
01-member-dashboard.png
02-basic-report.png
03-premium-report-hero.png
04-premium-pattern-cards.png
05-admin-report-history.png
```

## Public Fixture Rules

- Use synthetic report JSON only.
- Keep generated text non-diagnostic and reflective.
- Remove provider usage metadata if it came from real paid calls.
- Remove raw prompt text if it contains private context.
- Do not include uploaded user images.
- Do not include database exports.

## README Placement

After screenshots are created, add this near the top of `README.md`:

```md
## Screenshots

![Premium report hero](docs/screenshots/03-premium-report-hero.png)
![Premium pattern cards](docs/screenshots/04-premium-pattern-cards.png)
![Admin report history](docs/screenshots/05-admin-report-history.png)
```

## Final Pre-Publish Check

Before pushing to GitHub:

- Revoke any API keys that have ever lived in local `.env` files.
- Run a secret scan on the final staged files.
- Confirm `backend/.env` is not staged.
- Confirm `backend/tmp`, `dist`, `.angular`, `node_modules`, `legacy`, and `tune-analyze` are not staged.
- Confirm screenshots and sample JSON are synthetic.
