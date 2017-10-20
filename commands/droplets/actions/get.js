/**
 * @fileoverview Module handling the droplet action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'get <droplet id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a droplet action'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const dropletid = argv.dropletid
  const actionid = argv.actionid
  client.droplets.getAction(dropletid, actionid, (error, action) => {
    Util.handleError(error)
    Display.displayAction(action)
  })
}
