/**
 * @fileoverview Module handling the domain subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'domains'

exports.aliases = ['domain']

exports.description = 'Create, delete, and manage domains'.yellow

exports.builder = yargs => {
  yargs.commandDir('domains').demandCommand()
}
