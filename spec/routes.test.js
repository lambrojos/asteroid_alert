const P = require('bluebird')
const db = require('../lib/db')
const {getDangerousAsteroids} = require('../lib/poll')
const server = require('../index')
require('./mocks/nasa')

describe('the asteroid agend', () => {

  beforeEach(() => db('asteroid').truncate())

  it('gets warnings about asteroids', (done) => {
    getDangerousAsteroids('2016-09-13', '2016-09-14').then(() => done())
  })

  it('exposes a route that returns discovered dangerous asteroids', (done) => {
    getDangerousAsteroids('2016-09-13', '2016-09-14').then(() =>
        server.inject('/warnings')
    )
    .then(() => done())
  })
})
