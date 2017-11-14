;; Init MELPA
(require 'package)
(add-to-list 'custom-theme-load-path "~/.config/atomacs/.emacs.d/themes/")
(let* ((no-ssl (and (memq system-type '(windows-nt ms-dos))
                    (not (gnutls-available-p))))
       (url (concat (if no-ssl "http" "https") "://melpa.org/packages/")))
  (add-to-list 'package-archives (cons "melpa" url) t))
(when (< emacs-major-version 24)
  (add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))
(package-initialize)

;; Disable unimportant UI elements
(setq inhibit-startup-screen t)
(setq x-underline-at-descent-line t)
(tool-bar-mode -1)
(menu-bar-mode -1)
(scroll-bar-mode -1)

;; Mouse and keyboard changes
(global-set-key (kbd "<mouse-6>") 'scroll-right)
(global-set-key (kbd "<mouse-7>") 'scroll-left)
(global-unset-key (kbd "C-z"))
(global-set-key (kbd "C-z") "\C-x\4\f\C-g")
(put 'scroll-left 'disabled nil)
(delete-selection-mode 1)

;; Identation
(setq indent-tabs-mode nil)
(setq tab-width 2)
(setq js-indent-level 2)
(setq js2-basic-offset 2)
(setq tab-always-indent 'complete)

;; Do backups and autosaves in /tmp
(setq backup-directory-alist
      `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms
      `((".*" ,temporary-file-directory t)))

;; Disable funky JS errors
(setq js2-mode-show-parse-errors nil)
(setq js2-mode-show-strict-warnings nil)

;; Enable mouse support if available
(xterm-mouse-mode t)

;; Keymaps for splits
(global-set-key (kbd "C-s") nil)
(global-set-key (kbd "C-s C-a") 'split-window-vertically)
(global-set-key (kbd "C-s C-d") 'split-window-below)
(global-set-key (kbd "C-s C-q") 'delete-window)
