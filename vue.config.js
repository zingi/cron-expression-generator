module.exports = {
  outputDir: 'docs',
  publicPath: '/cron-expression-generator/',

  chainWebpack: config => {
    config.output.globalObject('this')
  }
}