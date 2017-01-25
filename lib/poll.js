'use strict'

const P = require('bluebird')
const Nasa = require('nasa-neows')
const client = P.promisifyAll(new Nasa('DEMO_KEY'))
const db = require('../lib/db')
const {values, flatMap, flow, property, filter, map, identity, tap} = require('lodash/fp')

const filterDangerous = flow([
  property('near_earth_objects'),
  values,
  tap(console.log),
  flatMap(filter(property('is_potentially_hazardous_asteroid'))),
  map(asteroid => ({
    name: asteroid.name,
    magnitude: asteroid.absolute_magnitude_h
  })),
  (bulkInsert) => db('asteroid').insert(bulkInsert).then(identity(bulkInsert))
])

const getDangerousAsteroids = (from, to) => {
  console.log('Searching for potentially hazardous asteroids')
  return client.getFeedAsync({
    start_date: from, // If not using start_date, set to null
    end_date: to,
    detailed: false
  })
  .then(filterDangerous)
}

module.exports.getDangerousAsteroids = getDangerousAsteroids
