#!/bin/bash

ETMO="$HOME/.config/etmo"
DIRNAME=`dirname $(readlink -f $0)`

# Configs
cp -r "$DIRNAME/../files/atom" "$ETMO/.atom"
cp -r "$DIRNAME/../files/emacs" "$ETMO/.emacs.d"

# Local packages
cp -r "$DIRNAME/../packages/atom-etmo-bar" "$ETMO/.atom/packages/atom-etmo-bar"

# Remote packages
env HOME=$ETMO apm install advanced-open-file linter linter-ui-default \
  intentions busy-signal
