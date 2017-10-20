/**
 * @fileoverview Module handling the volume creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new volume'.yellow

exports.builder = yargs => {
  const options = [
    'name', 'size_gigabytes', 'description', 'region', 'snapshot_id']
  yargs.option('name', {
    description: 'Set the volume name'.yellow
  }).option('size_gigabytes', {
    alias: ['size'],
    description: 'Set the volume size in gigabytes'.yellow,
    number: true
  }).option('description', {
    description: 'Set the volume description'.yellow
  }).option('region', {
    description: 'Set a volume region slug (do not specify a snapshot)'.yellow
  }).option('snapshot_id', {
    alias: ['snapshot', 'snapshots'],
    description: 'Set a volume snapshot ID (do not specify a region)'.yellow
  }).group(options, 'Volume Attributes:')
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  prompt.message = ''
  prompt.override = argv
  prompt.start()
  prompt.get({
    properties: {
      name: {
        description: 'Volume name'.yellow,
        required: true
      },
      // eslint-disable-next-line camelcase
      size_gigabytes: {
        description: 'Size (GB)',
        required: true,
        type: 'number'
      },
      description: {
        description: 'Description (optional)'
      },
      region: {
        description: 'Region slug (cannot be specified with a snapshot)'
      },
      // eslint-disable-next-line camelcase
      snapshot_id: {
        description: 'Base snapshot ID (cannot be specified with a region)'
      }
    }
  }, (error, result) => {
    Util.handleError(error)
    client.volumes.create(result, (clientError, volume) => {
      Util.handleError(clientError)
      Display.displayVolume(volume, 'Volume created.')
    })
  })
}
