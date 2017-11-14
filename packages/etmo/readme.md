
# Etmo (WIP)

> Use Atom and Emacs as one editor

A collection of packages to make Atom and Emacs behave as one editor.  Atom is turned more Emacs-like, and Emacs is used for a terminal editor.

Atom is a good graphical editor (theme support, linting, etc.), but Emacs has a minimal layout and better keybindings.  I also like using Emacs in the terminal for quicker edits.  But I my editors between graphical and terminal to be more similar.

## Install

This requires that you have `atom`, `emacs`, and `bash` installed.

You can install etmo through npm:

```sh
$ npm i -g jamen/etmo
```

Or clone the repo and link `etmo.sh` into your `PATH`:

```sh
$ ln -s bin/etmo.sh ~/.local/bin/etmo # User bin
$ ln -s bin/etmo.sh /usr/local/bin/etmo # Or system bin
```

## Usage

To start etmo in the terminal (as Emacs) you run:

```sh
$ etmo file
```

To start as a graphical process (as Atom) you run:

```sh
$ etmo -a file
```

This uses separate configs from your own so it doesnt conflict, but there is extra files included in these for compatibility between Atom and Emacs. The etmo config files are at:

```
~/.config/etmo
├── .atom
├── .config -> ~/.config
└── .emacs.d
```

You can install separate packages for Atom and Emacs, but try not to break the continuity.

### Uninstall and Reinstall

To uninstall (or reinstall) run:

```sh
# Uninstall atomacs
$ rm -rf ~/.config/etmo

# Install fresh copy
$ sh bin/etmo-update.sh
```

These are destructive actions.  Make sure you have copied anything you want to save.
