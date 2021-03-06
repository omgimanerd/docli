/**
 * @fileoverview This module handles the formatting of data for
 *   display in a cli-table3 Table.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

/**
 * This function joins a list of values by newlines for display in cli-table3.
 * If the resulting string is empty, then it returns the string none.
 * @param {Array.<Object>} dataList A list of objects to display
 * @return {string}
 */
exports.defaultJoin = dataList => {
  return dataList.join('\n').trim() || 'none'
}

/**
 * This takes an account status and colors it for output.
 * @param {string} status The account status to color
 * @return {string}
 */
exports.formatAccountStatus = status => {
  status = String(status)
  switch (status) {
  case 'active':
    return status.green
  case 'warning':
    return status.yellow
  case 'locked':
    return status.red
  }
  return status
}

/**
 * This takes a droplet action status and colors it for output.
 * @param {string} status The action status to color
 * @return {string}
 */
exports.formatActionStatus = status => {
  status = String(status)
  switch (status) {
  case 'completed':
    return status.green
  case 'in-progress':
    return status.yellow
  case 'errored':
    return status.red
  }
  return status
}

/**
 * This takes a certificate action status and colors it for output.
 * @param {string} status The certificate status to color
 * @return {string}
 */
exports.formatCertificateStatus = status => {
  status = String(status)
  switch (status) {
  case 'pending':
    return status.yellow
  case 'verified':
    return status.green
  case 'error':
    return status.red
  }
  return status
}

/**
 * Takes a date string and formats it for display.
 * @param {?string} date The date as a string
 * @return {string}
 */
exports.formatDate = date => {
  // eslint-disable-next-line no-undefined
  return date ? new Date(date).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }) : 'n/a'
}

/**
 * This takes a domain type and colors it for output.
 * @param {string} type The domain type to color
 * @return {string}
 */
exports.formatDomainType = type => {
  type = String(type)
  switch (type) {
  case 'A':
    return type.yellow
  case 'AAAA':
    return type.blue
  case 'CNAME':
    return type.green
  case 'MX':
    return type.cyan
  case 'TXT':
    return type.magenta
  case 'SRV':
    return type.red
  case 'NS':
    return type.gray
  }
  return type
}

/**
 * This takes a droplet status and colors it for output.
 * @param {string} status The droplet status to color
 * @return {string}
 */
exports.formatDropletStatus = status => {
  status = String(status)
  switch (status) {
  case 'new':
  case 'off':
    return status.red
  case 'active':
    return status.green
  case 'archived':
    return status.blue
  }
  return status
}

/**
 * Takes a list of inbound firewall rule objects described by the DigitalOcean
 * spec and formats it for display.
 * https://developers.digitalocean.com/documentation/v2/#firewalls
 * @param {Array.<Object>} rules The inbound firewall rules to display
 * @return {Array.<Array.<Object>>}
 */
exports.formatFirewallInboundRules = rules => {
  if (rules.length > 0) {
    const formattedRules = rules.map(rule => {
      let content = `${rule.protocol}:${rule.port}\n`
      for (const source in rule.sources) {
        content += `${source}\n`.green
        for (const value in rule.sources[source]) {
          content += `  ${value}\n`
        }
      }
      return [content]
    })
    formattedRules[0].unshift({
      rowSpan: formattedRules.length,
      content: 'Inbound Rules'
    })
    return formattedRules
  }
  return [
    ['Inbound Rules', 'none']
  ]
}

/**
 * Takes a list of outbound firewall rule objects described by the DigitalOcean
 * spec and format it for display.
 * https://developers.digitalocean.com/documentation/v2/#firewalls
 * @param {Array.<Object>} rules The outbound firewall rules to display.
 * @return {Array.<Array.<Object>>}
 */
exports.formatFirewallOutboundRules = rules => {
  if (rules.length > 0) {
    const formattedRules = rules.map(rule => {
      let content = `${rule.protocol}:${rule.port}\n`
      for (const source in rule.destinations) {
        content += `${source}\n`.green
        for (const value in rule.destinations[source]) {
          content += `  ${value}\n`
        }
      }
      return [content]
    })
    formattedRules[0].unshift({
      rowSpan: formattedRules.length,
      content: 'Outbound Rules'
    })
    return formattedRules
  }
  return [
    ['Outbound Rules', 'none']
  ]
}

/**
 * Takes a list of firewall rules and formats it for display. Unlike the other
 * firewall formatting methods, this one leaves out the source/destination
 * details.
 * @param {Array.<Object>} rules The list of firewall rules to display
 * @return {string}
 */
exports.formatFirewallRulesShort = rules => {
  return exports.defaultJoin(rules.map(
    rule => `${rule.protocol}:${rule.ports}`
  ))
}

/**
 * Colors any string designated as an ID.
 * @param {?string} id The ID to color
 * @return {string}
 */
exports.formatID = id => {
  return id && id !== 'none' ? String(id).bold.cyan : 'none'
}

/**
 * Turns a string of IDs into a newline separated colored string.
 * @param {Array.<number>} ids The list of IDs to color
 * @return {string}
 */
exports.formatIDList = ids => {
  return exports.formatID(exports.defaultJoin(ids))
}

/**
 * Formats a distribution image object name.
 * @param {string} name The image name
 * @param {boolean} isPublic Whether or not the image is public
 * @param {number} cutoff The character limit of the name
 * @return {string}
 */
exports.formatImageName = (name, isPublic, cutoff) => {
  const cutName = name.slice(0, cutoff - 3)
  const ellipsis = cutName.length !== name.length ? '...' : ''
  return `${isPublic ? cutName.green : cutName.blue}${ellipsis}`
}

/**
 * Colors any string designated as an IPv4 address
 * @param {string} ip The IP address to color
 * @return {string}
 */
exports.formatIP = ip => {
  return ip && ip !== 'none' ? String(ip).yellow : 'none'
}

/**
 * Turns a string of IPv4 addresses into a newline separated colored string.
 * @param {Array.<string>} ips The list of IP addresses to color
 * @return {string}
 */
exports.formatIPList = ips => {
  return exports.formatIP(exports.defaultJoin(ips))
}

/**
 * This takes a load balancer status and colors it for output.
 * @param {string} status The load balancer status to color
 * @return {string}
 */
exports.formatLoadBalancerStatus = status => {
  status = String(status)
  switch (status) {
  case 'new':
    return status.blue
  case 'active':
    return status.green
  case 'errored':
    return status.red
  }
  return status
}

/**
 * Colors any string designated as a name.
 * @param {string} name The name to color
 * @return {string}
 */
exports.formatName = name => {
  return String(name).blue
}

/**
 * Given a boolean status, this will return green yes or red no depending on
 * the status.
 * @param {boolean} status The status to check
 * @return {string}
 */
exports.formatStatus = status => {
  return status ? 'yes'.green : 'no'.red
}

/**
 * Colors the first element red in a series of rows for a table. Assumes the
 * given table has 2 or more rows.
 * @param {Array.<string>} rows Table rows to color
 * @return {Array.<string>}
 */
exports.formatTable = rows => {
  return rows.map(row => {
    if (row.length >= 2) {
      row[0] = row[0].red
    }
    return row
  })
}

/**
 * Takes a string and formats it with newlines such that each line is no
 * greater than a specified line length.
 * @param {string} text The text to format
 * @param {number} maxLineLength The maximum length of any line of text
 * @return {string}
 */
exports.formatTextWrap = (text, maxLineLength) => {
  const words = text.split(' ')
  let lineLength = 0
  let output = ''
  for (const word of words) {
    if (lineLength + word.length >= maxLineLength) {
      output += `\n${word} `
      lineLength = word.length + 1
    } else {
      output += `${word} `
      lineLength += word.length + 1
    }
  }
  return output
}
