
const { CompositeDisposable } = require('atom')
const EtmoBarView = require('./view.js')

module.exports = {

  etmoBarView: null,
  subscriptions: null,

  activate (state = {}) {
    this.etmoBarView = EtmoBarView()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'etmo-bar:focus': () => this.etmoBarView.focus()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
    this.etmoBarView.destroy()
  },

  serialize () {
    return this.etmoBarView.serialize()
  }
}
