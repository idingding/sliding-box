const path = require('path')

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.min.js'
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
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
