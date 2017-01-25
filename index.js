'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()
const db = require('./lib/db')
const { getDangerousAsteroids } = require('./lib/poll')

server.connection({
  host: process.env['HOST'] || '0.0.0.0',
  port: process.env['PORT'] || 3000,
  routes: {
    validate: {
      options: {
        abortEarly: false,
        stripUnknown: true
      }
    }
  }
})

server.route({
  handler: (request, reply) => reply(db('asteroid')),
  method: 'GET',
  path: '/warnings'
})

const getTodaysDanger = () => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  getDangerousAsteroids(
    yesterday.toISOString().substring(0, 10),
    today.toISOString().substring(0, 10)
  )
}
server.on('response', function (request) {
  console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
})
if (process.env.NODE_ENV !== 'test') {
  server.start((err) => {
    if (err) {
      throw err
    }
    // getTodaysDanger()
    setInterval(getTodaysDanger, 24 * 60 * 60 * 1000)
  })
}

module.exports = server
