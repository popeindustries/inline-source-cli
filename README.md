# inline-source-cli [![NPM Version](http://img.shields.io/npm/v/inline-source-cli.svg?style=flat)](https://npmjs.com/package/inline-source-cli)

> A CLI for [inline-source](https://github.com/popeindustries/inline-source)


## Installation

Available on [npm](https://npmjs.com/package/inline-source-cli):

```sh
npm install inline-source-cli
```


## Usage
```
inline-source <input> [output]

inline and compress tags that contain the inline attribute.
supports <script>, <link>, and <img> (including *.svg sources) tags

Positionals:
  input   (required) input html filename, or - to read from standard input
                                                                        [string]
  output  (optional) output html filename, or write to standard output if
          omitted                                                       [string]

Options:
  --version               Show version number                          [boolean]
  --compress, -z          enable/disable compression of inlined content.
                                                       [boolean] [default: true]
  --attribute, -a         attribute used to parse sources. all tags will be
                          parsed if set to false.   [string] [default: "inline"]
  --rootpath, -d, --root  directory path used for resolving inlineable paths.
                          default: process.cwd()                        [string]
  --help                  Show help                                    [boolean]
```

process HTML from 'file.html' and output to stdout:
```sh
inline-source --compress false --root ./ file.html
```

... or using pipes:

```sh
cat build/index.html | inline-source --root build - > build/bundle.html
```
