#!/bin/bash

ETMO="$HOME/.config/etmo"
DIRNAME=`dirname $(readlink -f $0)`

# Copy, create, and update
if [ ! -e $ETMO ]; then
  echo "Looks like your first time running etmo.  Running setup..."
  mkdir -p $ETMO
  bash $DIRNAME/etmo-update.sh
  echo "(Finished)"
fi

if [ ! $1 = "-a" ] && [ `command -v emacs` ]; then
  env HOME=$ETMO emacs -nw $*
elif [ -z `command -v atom` ] && [ `command -v emacs` ]; then
  env HOME=$ETMO emacs -nw ${@:2}
else
  env HOME=$ETMO atom ${@:2}
fi
