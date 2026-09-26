# passeride.com — Astro v2

Static personal blog/microblog built with Astro and deployed on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Content model

- `src/content/notes/`: short, title-optional microblog posts.
- `src/content/posts/`: longer articles.
- `src/content/projects/`: durable project pages.

The original Jekyll content is migrated into the Astro posts collection. Legacy `docs/` remains in this PR as a rollback path and currently also provides the existing image assets through Astro's `publicDir`.

## GitHub Pages cutover

After merging:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Confirm the custom domain remains `passeride.com`.
4. Verify the homepage, articles, RSS and images.
5. Remove legacy Jekyll files in a later cleanup PR after the Astro deployment is stable.

The workflow builds pull requests but only deploys pushes to `gh-pages`.
