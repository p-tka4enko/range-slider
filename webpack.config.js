const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Stylus = require('stylus');

const pluginConfig = {
  mode: 'production',
  entry: './src/js/range-slider.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'plugin/js/range-slider.js',
    library: 'RangeSlider',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/styl',
        to: 'plugin/css/[name].css',
        transform(content) {
          let css;
          Stylus(content.toString()).render((err, result) => { css = result; });
          return css;
        },
      },
    ]),
  ],
};

const demoConfig = {
  mode: 'production',
  entry: './src/demo/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/demo/index.pug',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules|.git)/,
        loader: 'pug-loader',
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules|.git)/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /favicon.ico$/,
        exclude: /(node_modules|.git)/,
        loader: 'file-loader',
        options: {
          name: 'favicon.ico',
        },
      },
    ],
  },
  devServer: {
    inline: true,
    hot: true,
  },
};

module.exports = [pluginConfig, demoConfig];
