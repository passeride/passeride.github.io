---
title: "2023.12.05-Update-Multiple-Git-dirs"
date: 2023-12-05T08:59:21+01:00
tags: [git, bash, snippet]
---
Simple bash script, by my man bot C-GPT to iterate over multiple git repos and pull

```bash
#!/bin/bash
search_dir=$1
for dir in "$search_dir"/*; do
    if [ -d "$dir" ]; then
        if [ -d "$dir/.git" ]; then
            echo "Pulling changes in $dir"
            cd "$dir"
            git pull
            cd "$search_dir"
        else
            echo "Skipping $dir - Not a Git repository"
        fi
    fi
done
```
