
const { CompositeDisposable } = require('atom')
const { app, h } = require('hyperapp')

module.exports = function () {
  const item = document.createElement('atom-panel')
  const panel = atom.workspace.addFooterPanel({ item })
  const sub = new CompositeDisposable()
  let timeout = null
  let input = null

  const actions = app({
    state: {
      keystrokes: [],
      accepting: false
    },
    actions: {
      // Utility actions
      update: (state, actions) => data => data,
      serialize: state => state,
      destroy: state => sub.dispose()
    },
    view: (state) => (
      h('div', { class: 'etmo-bar' }, [
        h('div', { class: 'command' }, [
          h('span', { class: 'block' },
            state.keystrokes.map(key =>
              h('span', { class: 'inline-block highlight' }, key)
            )
          ),
          h('input', {
            class: 'input-text',
            type: 'text',
            oncreate (el) {
              input = el
            }
          })
        ]),
        h('span', { class: 'active-panel' }, state.activePanel)
      ])
    )
  }, item)

  sub.add(atom.keymaps.onDidMatchBinding(({ keystrokes }) => {
    // Format keystrokes like Emacs
    keystrokes = keystrokes
      .replace(/ctrl[-]?/g, 'C-')
      .replace(/alt[-]?/g, 'M-')
      .replace(/shift[-]?/g, 'S-')
      .replace(/escape/g, 'ESC')
      .split(' ')

    if (/^(C-|M-|ESC)/.test(keystrokes)) {
      actions.update({ keystrokes })
      clearTimeout(timeout)
      timeout = setTimeout(() => actions.update({ keystrokes: [] }), 5000)
    }
  }))

  return actions
}
