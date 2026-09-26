# AGENTS.md

This file is the operating guide for coding agents working in this repository.

## What this repository is

`passeride.com` is a static personal blog/microblog built with Astro and deployed to GitHub Pages.

The source of truth is Markdown plus Astro source code in the repository. There is no CMS, database, or server-side application.

## Repository layout

- `src/content/notes/` — short microblog-style notes. Titles are optional.
- `src/content/posts/` — longer articles.
- `src/content/projects/` — durable project pages.
- `src/pages/` — Astro routes.
- `src/layouts/` — page layouts.
- `src/styles/` — global styling.
- `docs/` — legacy Jekyll site and currently the source for migrated static assets.
- `.github/workflows/deploy.yml` — GitHub Pages build/deploy workflow.
- `scripts/agent-check.sh` — local validation command for agents.

## Important rule: `docs/` is legacy

Do not add new blog content to `docs/_posts/`.

New content belongs in the Astro collections under `src/content/`.

The old Jekyll site remains only as a migration/rollback artifact. Existing assets under `docs/assets/` are still exposed by Astro through `publicDir`. Do not delete or reorganize them casually, because old posts may depend on those paths.

A later cleanup may move assets into `public/`, but that should be handled as an explicit migration.

## Content model

### Notes

Use notes for short observations, snippets, progress updates, or microblog entries.

Example:

```md
---
date: 2026-09-26T09:30:00+02:00
tags:
  - selfhosting
  - docker
---

Short note text.
```

Optional field:

```yaml
title: "Optional title"
```

### Articles

Use posts for longer writing.

Example:

```md
---
title: "Article title"
date: 2026-09-26
description: "Short summary used in listings and feeds."
tags:
  - linux
  - security
---

Article body.
```

### Projects

Use projects for durable pages about ongoing or completed work.

Example:

```md
---
title: "Project name"
description: "Short project description."
status: active
tags:
  - selfhosting
---

Project documentation.
```

Allowed project statuses:

- `active`
- `paused`
- `complete`
- `archived`

## File naming

Prefer lowercase kebab-case.

Examples:

- `src/content/notes/2026-09-26-whisper-prompt.md`
- `src/content/posts/2026-09-26-self-hosting-layout.md`
- `src/content/projects/openclaw.md`

Dates in filenames are recommended for notes and articles.

Do not rely on filenames as the publication date. Always set the frontmatter date explicitly.

## Writing and editing content

Preserve the author's voice. Do not rewrite existing prose merely for style unless explicitly asked.

When editing old material:

- fix broken rendering or metadata when needed;
- avoid silently changing the substance of historical posts;
- preserve external links where possible;
- preserve or redirect old URLs when changing slugs.

Do not generate filler text for About, Projects, or other pages unless explicitly requested.

## Images and static assets

Current legacy assets live in `docs/assets/`.

Because Astro currently has:

```js
publicDir: './docs/assets'
```

a file at:

```text
docs/assets/images/example.png
```

is referenced as:

```md
![Example](/images/example.png)
```

Do not use `/assets/images/...` for Astro content unless the asset configuration has deliberately changed.

## Design principles

Keep the site:

- static;
- lightweight;
- readable;
- Markdown-first;
- low-JavaScript by default;
- text-focused rather than template-heavy.

Avoid introducing a frontend framework, client-side state library, analytics service, CMS, database, or external font dependency without a concrete requirement.

Prefer plain Astro and CSS.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Agents should normally run:

```bash
./scripts/agent-check.sh
```

before considering a change complete.

## Validation requirements

For code, layout, routing, schema, or content-collection changes:

1. Run the production build.
2. Treat Astro warnings and schema failures as defects unless understood and documented.
3. Verify newly added routes are statically generated.
4. Check image paths when touching migrated posts.
5. Check RSS generation when changing content metadata or routing.

For Markdown-only content changes, a production build is still preferred.

## Deployment

Production deploys from `gh-pages` via GitHub Actions.

Do not:

- manually publish generated `dist/` files;
- commit `dist/`;
- change the GitHub Pages source;
- bypass the deployment workflow;
- add a second deployment system without an explicit architecture decision.

Pull requests should build successfully before merge.

## Branches and pull requests

For non-trivial changes:

1. Create a focused branch from `gh-pages`.
2. Make the smallest coherent change.
3. Run validation.
4. Open a PR back to `gh-pages`.
5. Explain migration or deployment consequences in the PR body.

Avoid bundling unrelated cleanup into feature PRs.

## Dependencies

Keep dependencies minimal.

Before adding a package, ask:

- Can Astro or the platform already do this?
- Can this be implemented with a small amount of local code?
- Does the package add client-side JavaScript or runtime requirements?

Do not add dependencies just to simplify a few lines of code.

## URL stability

Published URLs should be considered durable.

Before renaming content IDs, routes, or collections, consider existing inbound links and RSS readers. Prefer preserving the existing URL or adding an explicit redirect strategy.

## Security and privacy

This site is public.

Never commit:

- secrets;
- API keys;
- access tokens;
- private hostnames or credentials;
- personal data that was not explicitly intended for publication.

No secrets are required for normal site builds.

## Definition of done

A change is complete when:

- it follows the content model and repository structure;
- legacy Jekyll content was not accidentally reactivated;
- `./scripts/agent-check.sh` passes;
- relevant URLs and assets are intact;
- the PR explains any deployment, URL, or migration impact.
