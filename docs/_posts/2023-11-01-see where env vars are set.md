---
layout: post
title:  see where env vars are set
date:   2023-11-01 10:14:45 +0100
tags: linux bash snippet env
---

# Use case
Some env var is causing you trouble, you don't know who or what set it.

Disclaimer: I don't know how this works, and the output is nasty, but it's saved me before

# Script

``` bash
PS4='+$BASH_SOURCE> ' BASH_XTRACEFD=7 bash -xl 7>&2
```
