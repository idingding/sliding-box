module.exports = {
    entry: './src/scripts/app.js',
    output: {
        path: __dirname + '/build',
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
            }
        ]
    }
}
