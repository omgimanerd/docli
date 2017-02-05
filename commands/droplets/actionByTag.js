/**
 * @fileoverview Module handling the droplet delete by tag command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'actionByTag <tag>';

exports.description = 'Perform actions on droplets by tag'.yellow;

exports.builder = (yargs) => {
  yargs.option('action', {
    description: 'The action to perform on the droplets',
    required: true,
    choices: [
      'delete', 'power_cycle', 'power_on', 'shutdown',
      'enable_private_networking', 'enable_ipv6', 'enable_backups',
      'disable_backups', 'snapshot'
    ]
  })
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  var action = argv.action;
  if (action === 'delete') {
    client.droplets.deleteByTag(argv.tag, (error) => {
      Util.handleError(error);
      Display.displayMessage('Droplets deleted.');
    });
  } else {
    client.droplets.actionByTag(argv.tag, action, (error, action) => {
      Util.handleError(error);
      Display.displayActionID(action, 'Executing action...');
    });
  }
};
