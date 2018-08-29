/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <key id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an SSH key'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.account.deleteSshKey(argv.keyid, error => {
    Util.handleError(error)
    Display.displayMessage(`SSH Key ${argv.keyid} deleted.`)
  })
}
