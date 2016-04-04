'use strict'
module.exports = plugin

const readPkgUp = require('read-pkg-up')
const getScriptsInfo = require('npm-scripts-info')

function plugin (markdown) {
  return readPkgUp({cwd: markdown.filePath})
    .then(result => {
      const pkg = result.pkg

      const scriptsInfo = getScriptsInfo(pkg)

      return Promise.resolve({
        scripts: () => [
          '## Scripts',
        ].concat(
          Object.keys(scriptsInfo)
            .map(scriptName => `- **${scriptName}** - ${scriptsInfo[scriptName]}`)
        ).join('\n'),
      })
    })
}
