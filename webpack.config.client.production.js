// 📂 Lokasi: webpack.config.client.production.js

import path from 'path'
import webpack from 'webpack'

const config = {
  name: 'client',
  mode: 'production',
  entry: './client/main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    extensions: ['.js']
  }
}

export default config
