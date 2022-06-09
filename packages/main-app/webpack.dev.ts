import type { Configuration } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { merge } from 'webpack-merge'
import common from './webpack.common'

const devServer: DevServerConfiguration = {
  port: 3000,
  historyApiFallback: true,
}

const dev: Configuration = {
  mode: 'development',
  stats: 'errors-warnings',
  devServer,
}

const config = merge(common, dev)

export default config
