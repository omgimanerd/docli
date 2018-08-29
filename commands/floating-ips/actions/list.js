/**
 * @fileoverview Module handling the floating IP action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'list <floating ip>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on a floating IP'.yellow

exports.builder = () => {
  const client = Util.getClient()
  client.floatingIps.listActions((error, actions) => {
    Util.handleError(error)
    display.displayActions(actions)
  })
}
