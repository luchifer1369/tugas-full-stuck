// 📂 Lokasi: webpack.config.client.js

import path from 'path'
import webpack from 'webpack'

const config = {
  name: 'client',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/main.js'
  ],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js']
  },
  devtool: 'eval-source-map'
}

export default config
