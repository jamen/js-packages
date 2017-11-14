
// Bug with atom where tree-view doesnt disable on start up
atom.workspace.observeTextEditors(function (e) {
  atom.packages.enablePackage('tree-view')
  setTimeout(function () {
    atom.packages.disablePackage('tree-view')
  }, 250)
})
