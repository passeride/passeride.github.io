---
title: "2023.12.04-Fzf-Pulseaudio"
date: 2023-12-04T18:29:44+01:00
tags: [linux, bash, audio]
---
Find it kinda annoying to open graphical windows when using i3, and I'm not used to floating windows yet.

Anyhow, GPT made this, so I made this

## `SwitchAudioSink.sh`
```bash
#!/bin/bash
selected_sink=$(pactl list short sinks | fzf --height 40% --border | awk '{print $1}')
if [ -z "$selected_sink" ]; then
    echo "No sink selected, exiting."
    exit 1
fi
pactl set-default-sink $selected_sink
pactl list short sink-inputs | cut -f1 | while read stream; do
    pactl move-sink-input $stream $selected_sink
done
echo "Sink changed successfully."
```

## `SwitchAudioSource.sh`
```bash
#!/bin/bash
selected_source=$(pactl list short sources | fzf --height 40% --border | awk '{print $1}')
if [ -z "$selected_source" ]; then
    echo "No input source selected, exiting."
    exit 1
fi
pactl set-default-source $selected_source
echo "Input source changed successfully."
```
