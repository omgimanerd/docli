/**
 * @fileoverview Module handling the listing of possible droplet sizes.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../lib/Display');
var Util = require('../lib/Util');

exports.command = 'sizes';

exports.aliases = ['size'];

exports.description = 'Lists the available droplet sizes'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 0, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.sizes.list((error, sizes) => {
    Display.displaySizes(sizes);
  });
};
