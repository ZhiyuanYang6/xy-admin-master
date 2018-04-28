'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.1.9:"', //张人延
  // BASE_API: '"http://192.168.1.13:8081"', //何伟
  BASE_API: '"http://192.168.1.117:8081"', //朱海
})
