
# Atomacs (WIP)

> Use Atom and Emacs as one editor 

A collection a scripts, configs, and packages to make Atom and Emacs behave as one editor.  Atom is turned more Emacs-like, and Emacs is used for the terminal editor.

This requires that you have `atom`, `emacs`, and `bash` installed.

## Install

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

Atomics doesnt conflict with your Atom and Emacs configs, but there is files included in Atomics for compatibility. They are created at: 

```
~/.config/atomacs
├── .atom
├── .config -> ~/.config
└── .emacs.d
```

### Uninstall and Reinstall

To uninstall (or reinstall) atomacs run:

```sh
# Uninstall atomacs
$ rm -rf ~/.config/atomacs

# Install fresh copy
$ sh bin/atomacs-update.sh
```

These are destructive actions.  Make sure you have copied anything you want to save.