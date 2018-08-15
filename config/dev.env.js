'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.97.171.192:8088/ggz"',
  //BASE_API: '"http://192.168.1.113:8088/ggz"',
})
