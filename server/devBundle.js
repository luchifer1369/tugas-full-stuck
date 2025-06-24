// Import Webpack dan middleware yang dibutuhkan untuk pengembangan
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.client.js"; // Konfigurasi Webpack untuk client-side

// Fungsi utama untuk meng-compile dan menghubungkan middleware
const compile = (app) => {
  // Membuat compiler dari konfigurasi webpack
  const compiler = webpack(webpackConfig);

  // Middleware pertama: menyajikan bundle secara langsung dari memori (tanpa output ke file)
  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath, // Path yang sesuai dengan output Webpack
    })
  );

  // Middleware kedua: memungkinkan hot-reload React di browser tanpa reload manual
  app.use(WebpackHotMiddleware(compiler));
};

// Ekspor sebagai objek agar bisa dipanggil dari server utama
export default { compile };
