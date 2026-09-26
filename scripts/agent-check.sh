#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "$repo_root"

if [[ ! -f package.json ]]; then
  echo "error: package.json not found; run this script from the Passeride repository"
  exit 1
fi

echo "==> Installing dependencies"
npm install --no-fund --no-audit

echo "==> Building Astro site"
npm run build

echo "==> Checking generated output"
test -f dist/index.html
test -f dist/feed.xml
test -d dist/articles
test -d dist/notes
test -d dist/projects

echo "==> Agent checks passed"
