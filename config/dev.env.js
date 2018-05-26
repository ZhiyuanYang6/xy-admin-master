'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.1.13:8081"', //本地
  BASE_API: '"http://175.6.4.138:6017"', //外网测试环境
  //BASE_API: '"http://192.168.1.253:8899"', //253开发环境
})
