/**
 * @fileoverview Module handling the listing of possible droplet sizes.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../lib/display')
const util = require('../lib/util')

exports.command = 'sizes'

exports.aliases = ['size']

exports.description = 'List the available droplet sizes'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.sizes.list((error, sizes) => {
    display.displaySizes(sizes)
  })
}
