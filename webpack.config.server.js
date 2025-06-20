// 📂 Lokasi: webpack.config.server.js

import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'

const config = {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: './server/server.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'server.generated.js'
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}

export default config
