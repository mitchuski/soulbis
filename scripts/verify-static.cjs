const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const required = ['index.html']

for (const file of required) {
  const p = path.join(root, file)
  if (!fs.existsSync(p)) {
    console.error('verify-static: missing', file)
    process.exit(1)
  }
}

console.log('Static site OK:', required.join(', '))
