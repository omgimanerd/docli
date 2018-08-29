/**
 * @fileoverview Module handling the image delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <image id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an image'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.images.delete(argv.imageid, error => {
    Util.handleError(error)
    display.displayMessage(`Image ${argv.imageid} deleted.`)
  })
}
