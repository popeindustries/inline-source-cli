#!/usr/bin/env node

import { inlineSource } from 'inline-source'
import yargs from 'yargs'
import * as rw from 'rw'
import * as path from 'path'

const argv = yargs
  .command('$0 <input> [output]', 'inline and compress tags that contain the inline attribute.\nsupports <script>, <link>, and <img> (including *.svg sources) tags', function (yargs) {
    yargs
    .positional('input', {
      describe: '(required) input html filename, or - to read from standard input',
      type: 'string'
    })
    .positional('output', {
      describe: '(optional) output html filename, or write to standard output if omitted',
      type: 'string'
    })
  })
  .options({
    'compress': {
      alias: 'z',
      describe: 'enable/disable compression of inlined content.',
      type: 'boolean',
      default: true
    },
    'attribute': {
      alias: 'a',
      describe: 'attribute used to parse sources. all tags will be parsed if set to false.',
      type: 'string',
      default: 'inline'
    },
    'rootpath': {
      alias: [ 'd', 'root' ],
      describe: 'directory path used for resolving inlineable paths.\ndefault: process.cwd()',
      type: 'string'
    }
  })
  .help()
  .argv

const input = argv.input === '-' ? '-' : path.resolve(argv.input)
const output = !argv.output ? '-' : path.resolve(argv.output)
const opts = {
  compress: argv.compress,
  rootpath: argv.rootpath || process.cwd(),
  attribute: argv.attribute
}
const enc = 'utf8'

rw.dash.readFile(input, enc, function (err, html) {
  if (err) {
    return exit(err)
  }
  inlineSource(html, opts)
  .then(function (html) {
    rw.dash.writeFile(output, html, enc, exit)
  })
  .catch(exit)
})

function exit (err) {
  if (!err) {
    return void (process.exitCode = 0)
  }
  process.stderr.write(`Error: ${err}\n`)
  process.exitCode = 1
}
