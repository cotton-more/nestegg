const path = require('path');
const webpack = require("webpack");


module.exports = {
    // context: path.join(__dirname, 'app/static/components'),
    entry: {
        react: ["react", "react-dom", "react-bootstrap"],
        jquery: ["jquery"],
        budget_create: "./app/static/components/BudgetCreate.js"
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'app/static/js')
    },
    watch: true,
    module: {
        loaders: [{
            // test: /\.jsx?$/,
            loaders: ['babel'],
            include: [
                path.resolve(__dirname, "./app/static/components"),
            ],
            exclude: [
                path.resolve(__dirname, "node_modules"),
            ]
        }],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['jquery', 'react'],
            filename: '[name].js'
        })
    ]
};