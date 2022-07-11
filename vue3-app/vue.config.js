const { defineConfig } = require('@vue/cli-service')
const pkg = require('./package.json')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      library: `${pkg.name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${pkg.name}`,
      globalObject: 'window'
    }
  }
})
