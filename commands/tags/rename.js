/**
 * @fileoverview Module handling the renaming of a tag.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'rename <tag> <new tag>'

exports.aliases = ['update']

exports.description = 'Rename a tag'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.tags.update(argv.tag, { name: argv.newtag }, (error, tag) => {
    Util.handleError(error)
    Display.displayTag(tag, 'Tag renamed.')
  })
}
