#!/bin/bash

ETMO="$HOME/.config/etmo"
DIRNAME=`dirname $(readlink -f $0)`

ln -s "$HOME/.config" "$ETMO/.config"
cp -r "$DIRNAME/../files/atom" "$ETMO/.atom"
cp -r "$DIRNAME/../files/emacs" "$ETMO/.emacs.d"

env HOME=$ETMO apm install advanced-open-file linter linter-ui-default \
  intentions busy-signal
