/**
 * @fileoverview Module handling the snapshot getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <snapshot id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a snapshot'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  /**
   * We're going to use the images endpoint to get the
   * snapshot so that we can get information like
   * distribution and type.
   */
  client.images.get(argv.snapshotid, (error, image) => {
    Util.handleError(error)
    Display.displayImage(image)
  })
}
