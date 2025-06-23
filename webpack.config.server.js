  // 📁 webpack.config.server.js
  import path from 'path'
  import webpack from 'webpack'
  import nodeExternals from 'webpack-node-externals'

  const config = {
    name: 'server',
    target: 'node',
    mode: 'production',
    entry: './server/server.js',
    output: {
      path: path.resolve('./dist'),
      filename: 'server.generated.js',
      publicPath: '/dist/'
    },
    externals: [nodeExternals()],
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
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }

  export default config
