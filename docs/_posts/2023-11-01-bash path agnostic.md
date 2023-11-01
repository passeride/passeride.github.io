---
layout: post
title:  bash path agnostic
date:   2023-11-01 10:10:34 +0100
---
# Use Case

Often in projects there are bash scripts for building and configuring.
However sometimes the script is designed to assume you are in a specific working directory.
That's quite annoying if you are deep in a file tree, so with this is simple script you can create wd-agnostic scripts.

# Script
Say you have a `./script/build.sh`
```bash
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

pushd $SCRIPTPATH/.. 
# Now you are in the `root` of the project

popd
```
