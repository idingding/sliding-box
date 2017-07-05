const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.min.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    watchContentBase: true,
    compress: true,
    overlay: true,
    inline: true,
    hot: true
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.min.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.min.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
}
