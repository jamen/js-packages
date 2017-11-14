#!/bin/bash

ATOMACS="$HOME/.config/atomacs"
DIRNAME=`dirname $(readlink -f $0)`

ln -s "$HOME/.config" "$ATOMACS/.config"
cp -r "$DIRNAME/../files/atom" "$ATOMACS/.atom"
cp -r "$DIRNAME/../files/emacs" "$ATOMACS/.emacs.d"

env HOME=$ATOMACS apm install advanced-open-file linter linter-ui-default \
  intentions busy-signal
