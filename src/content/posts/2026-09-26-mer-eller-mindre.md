---
title: "Mer eller mindre? — a card game about real sentences"
date: 2026-09-26T10:20:00+02:00
description: "A card game where players place real criminal cases on a growing scale of how harshly they were punished — and why the mechanic may end up somewhere else entirely."
tags: [game-design, card-game, project]
---

# Mer eller mindre?

A card game about real punishments. The front of a card shows an offence. The back shows what it actually cost the person who did it.

## The mechanic

One card starts face up on the table with its punishment known — say speeding, and a 2 000 NOK fine. The next card names another offence, and the players decide whether the punishment was higher or lower. Higher goes right. Lower goes left. As the row fills up, a new card has to be placed left, right, or *between* what is already there.

Then the card is turned over, and the placement is checked. The goal is a correct scale of punishment, built one card at a time. Mechanically it is a timeline game — with sentences instead of years.

## What is on the cards

The front carries the case text, the country's flag, a hidden or censored illustration, and the question itself. The back repeats the case and the flag, reveals the illustration, and puts the original sentence as the main value — with an approximate normalised figure in 2026 euros as a small footnote underneath.

The original sentence is always the answer. The euro figure is only a comparison tool, marked with "≈", and never invented: if there is no documented inflation factor and exchange rate for that country and year, the normalisation is left out rather than guessed.

## The data

Two decks were built:

- **Nordic odd fines** — 46 cases: 13 Norwegian, 19 Swedish, 14 Danish. Fields include country, date, offence, fine, amount, currency, other reactions, a comparability note, and a source.
- **UK fines** — 50 ranked cases, from £7 to £70 000, with card text, back text, convicted party, year, jurisdiction, other reactions, content labelling, and a source. 29 of them are marked as family-friendly candidates.

The datasets are good raw material, but the totals cannot be ranked naively on one shared scale. Norwegian drink-driving fines and Swedish day-fines depend on income. Combined sentences, damages, and loss of driving privileges have to be shown separately — the fine alone understates what actually happened.

The recommended first prototype was narrow on purpose: one jurisdiction, one period, fines only. The 13 Norwegian cases, combination sentences split out, clean NOK fines from roughly the same period. That gives the most understandable first deck, and makes it easy to test whether the mechanic itself is any fun.

## Where it hit a wall

There is a fundamental problem with the premise. **There is no obvious or stable enough relationship between the offence and the punishment for players to reason their way to a placement.** A candy bar stolen from a baby and a speeding ticket do not sit on a scale anyone can feel their way along. The result is closer to guessing than to judging — and a game that is guessing is not really a game about anything.

So the active work stopped. The datasets, the card design, and the print order are on hold indefinitely.

## Where it might go instead

The mechanic itself may still be fine. It is the material that failed. It needs quantities whose relative sizes people can actually reason about — where knowledge and a sense of scale give you real footing, and where the surprises still land as jokes rather than as noise.

One candidate: **the state budget.** Cards with different budget items, placed where they belong by size of allocation. Category knowledge and a sense of what things cost are a real basis for reasoning, and the gap between what you think a post costs and what it actually costs is its own kind of humour.

Which leaves an open question, and the reason this is written down rather than quietly shelved: does *Mer eller mindre?* go away — or does the mechanic move to material that can carry it?
