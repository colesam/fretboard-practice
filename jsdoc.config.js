'use strict'

module.exports = {
  plugins: ['node_modules/jsdoc-vuejs'],
  recurseDepth: 10,
  source: {
    includePattern: '\\.(vue|js)$'
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true
  },
  templates: {
    default: {
      outputSourceFiles: false
    },
    cleverLinks: false,
    monospaceLinks: true,
    useLongnameInNav: false,
    showInheritedInNav: true
  },
  opts: {
    destination: './docs',
    encoding: 'utf8',
    recurse: true,
    template: './node_modules/minami'
  }
}
