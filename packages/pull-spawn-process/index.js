const to_pull = require('stream-to-pull-stream')
const child_process = require('child_process')

module.exports = spawn

function spawn (command, args, options) {
  if (!Array.isArray(args)) options = args, args = []

  // Get process
  const proc = child_process.spawn(command, args, options)
  
  // Return duplex (with extra `stream.error` for stderr)
  return {
    source: to_pull.source(proc.stdout), 
    sink: to_pull.sink(proc.stdin),
    error: to_pull.sink(proc.stderr)
  }
}

