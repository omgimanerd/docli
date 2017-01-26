/**
 * @fileoverview Module handling the snapshot getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <snapshot id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a snapshot'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  /**
   * We're going to use the images endpoint to get the
   * snapshot so that we can get information like
   * distribution and type.
   */
  client.images.get(argv.snapshotid, (error, image) => {
    Util.handleError(error);
    Display.displayImage(image);
  });
};
