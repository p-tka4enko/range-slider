const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Stylus = require('stylus');

const pluginConfig = {
  mode: 'production',
  entry: './src/js/range-slider.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/range-slider.js',
    library: 'RangeSlider',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/styl',
        to: 'css/[name].css',
        transform(content, path) {
          let css;
          Stylus(content.toString()).render((err, result) => { css = result; });
          return css;
        }
      }
    ])
  ]
};

const demoConfig = {
  mode: 'production',
  entry: './src/demo/demo.js',
  output: {
    path: path.resolve(__dirname, 'dist/demo'),
    filename: 'demo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: './src/demo/demo.pug'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules|.git)/,
        loader: 'pug-loader'
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules|.git)/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /favicon.ico$/,
        exclude: /(node_modules|.git)/,
        loader: 'file-loader',
        options: {
          name: 'favicon.ico'
        }
      }
    ]
  }
};

module.exports = [pluginConfig, demoConfig];
