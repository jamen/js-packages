const to_pull = require('stream-to-pull-stream')
const child_process = require('child_process')

module.exports = spawn

function spawn (command, args, options) {
  if (!Array.isArray(args)) options = args, args = []

  // Get process
  const proc = child_process.spawn(command, args, options)
  
  // Turn into a duplex stream
  proc.source = to_pull.source(proc.stdout)
  proc.sink = to_pull.sink(proc.stdin)
  proc.error = to_pull.sink(proc.stderr)

  return proc
}

