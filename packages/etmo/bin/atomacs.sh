#!/bin/bash

ATOMACS="$HOME/.config/atomacs"
DIRNAME=`dirname $(readlink -f $0)`

# Copy, create, and update
if [ ! -e $ATOMACS ]; then
  mkdir -p $ATOMACS
  bash $DIRNAME/atomacs-update.sh
fi

if [ ! $1 = "-a" ] && [ `command -v emacs` ]; then
  env HOME=$ATOMACS emacs -nw $*
elif [ -z `command -v atom` ] && [ `command -v emacs` ]; then
  env HOME=$ATOMACS emacs -nw ${@:2}
else
  env HOME=$ATOMACS atom ${@:2}
fi
