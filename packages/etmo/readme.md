
# Atomacs (WIP)

> Use Atom and Emacs as one editor

A collection a scripts, configs, and packages to make Atom and Emacs behave as one editor.  Atom is turned more Emacs-like, and Emacs is used for the terminal editor.

Why did I do this?  Because I like Atom as a graphical editor, but I like the Emacs
keybindings and minimalism.  I also like using Emacs as a quick terminal editor in
fallback of Atom.

## Install

This requires that you have `atom`, `emacs`, and `bash` installed.

You can install Atomacs through npm:

```sh
$ npm i -g jamen/atomacs
```

Or clone the repo and link `atomacs.sh` into your `PATH`:

```sh
$ ln -s bin/atomacs.sh ~/.local/bin/atomacs # User bin
$ ln -s bin/atomacs.sh /usr/local/bin/atomacs # Or system bin
```

## Usage

To start Atomacs in the terminal (Emacs) you run:

```sh
$ atomacs file
```

To start as a graphical process (Atom) you run:

```sh
$ atomacs -a file
```

This uses separate configs from your own so it doesnt conflict, but there is extra files included in these for compatibility between Atom and Emacs. The Atomacs config files are at:

```
~/.config/atomacs
├── .atom
├── .config -> ~/.config
└── .emacs.d
```

You can install separate Atom and Emacs packages, but it breaks continuity.

### Uninstall and Reinstall

To uninstall (or reinstall) run:

```sh
# Uninstall atomacs
$ rm -rf ~/.config/atomacs

# Install fresh copy
$ sh bin/atomacs-update.sh
```

These are destructive actions.  Make sure you have copied anything you want to save.
