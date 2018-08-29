/**
 * @fileoverview Module handling the enabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'enable <droplet id>'

exports.aliases = ['on']

exports.description = 'Enable automatic backups for a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Automatic backups enabled.')
    display.displayActionID(action)
  })
}
