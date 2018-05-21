'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.1.109:"', //张人延
  // BASE_API: '"http://192.168.1.117:8899"', //朱海
  // BASE_API: '"http://192.168.1.14:8081"', //黄恩平
  // BASE_API: '"http://192.168.1.13:8899"', //何伟
  BASE_API: '"http://192.168.1.253:8899"', //汇总
})
