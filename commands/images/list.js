/**
 * @fileoverview Module handling the image listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List images on your account'.yellow

exports.builder = yargs => {
  yargs.option('application', {
    description: 'Show application based images'.yellow
  }).option('distribution', {
    description: 'Show distribution based images'.yellow
  }).option('private', {
    description: 'Show all private user images'.yellow
  }).group(['application', 'distribution', 'private'], 'Image Display Options:')
}

exports.handler = argv => {
  const client = util.getClient()
  const query = {}
  if (argv.private) {
    query.private = true
  } else if (argv.application) {
    query.type = 'application'
  } else if (argv.distribution) {
    query.type = 'distribution'
  } else {
    query.page = 1
    // eslint-disable-next-line camelcase
    query.per_page = Number.MAX_SAFE_INTEGER
  }
  client.images.list(query, (error, images) => {
    util.handleError(error)
    display.displayImages(images)
  })
}
