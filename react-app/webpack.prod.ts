import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import WebpackBar from 'webpackbar'
import common from './webpack.common'

const prod: Configuration = {
  mode: 'production',
  devtool: false,
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        thirds: {
          test: /[\\/]node_modules[\\/](\@babel\/runtime-corejs3|core-js-pure|react-router|react-router-dom|history)[\\/]/,
          name: 'thirds',
          chunks: 'all',
        }
      },
    },
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
}

const config = merge(common, prod)

export default config
