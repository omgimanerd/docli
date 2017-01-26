/**
 * @fileoverview Module handling the ssh commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'ssh';

exports.description = 'Create, delete, and manage SSH public keys'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('ssh');
  Util.globalConfig(yargs, 0, exports.command, true);
};
