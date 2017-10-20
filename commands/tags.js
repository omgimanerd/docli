/**
 * @fileoverview Module handling the tag subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = ['tags']

exports.aliases = ['tag']

exports.description = 'Create, delete, and manage tags'.yellow

exports.builder = yargs => {
  yargs.commandDir('tags')
  Util.globalConfig(yargs, 1, exports.command, true)
}
