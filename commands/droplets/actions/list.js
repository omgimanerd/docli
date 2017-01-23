/**
 * @fileoverview Module handling the droplet action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List all actions performed on a droplet'.yellow;

exports.builder = (yargs) => {
  yargs.option('limit', {
    alias: 'number',
    description: 'The maximum number of actions to fetch',
    number: true
  });
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.listActions(argv.dropletid, (error, actions) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(actions);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Status', 'Type', 'Completed']
      });
      if (typeof(argv.limit) === 'number') {
        actions = actions.slice(0, argv.limit);
      }
      table.push.apply(table, actions.map((action) => {
        return [
          util.colorID(action.id),
          util.colorActionStatus(action.status),
          action.type,
          new Date(action.completed_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
