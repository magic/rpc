const grpc = require('grpc')

const log = require('@magic/log')

const defaultConfig = require('./config')

const createCredentials = grpc => {
  // no secure for now
  return grpc.credentials.createInsecure()
}

const main = (options = {}) => {
  const { host, port, service, package, path } = Object.assign(
    {},
    defaultConfig,
    options,
  )

  const proto = grpc.load(path)[package]

  const url = `${host}:${port}`
  log.info(`rpc client connecting to ${url}`)
  const credentials = createCredentials(grpc)

  const client = new proto[service](url, credentials)

  return client
}

module.exports = main
