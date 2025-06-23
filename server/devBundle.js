// server/devBundle.js
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.client.js'

const compile = (app) => {
  const compiler = webpack(webpackConfig)
  app.use(WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(WebpackHotMiddleware(compiler))
}

export default { compile }
