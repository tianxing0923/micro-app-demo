import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'
import WebpackBar from 'webpackbar'
import pkg from './package.json'

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    clean: true,
    filename: '[name].[contenthash].js',
    library: `${pkg.name}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${pkg.name}`,
    globalObject: 'window'
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: {
          not: [/url/], // not *.svg?url
        },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-app',
      template: 'index.html',
    }),
    new WebpackBar(),
  ],
}

export default config
