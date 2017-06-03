const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./util/index.js');
const pages = util.getPages();
const projName = util.getProjName();


const config = {
    entry: {
        main: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['last 2 versions'],
                                }),
                            ]
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: path.join('images/', projName, '[name].[ext]')
                    }
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin(path.join('styles/', projName, '[name].css')),
    ]
}
for(let i = 0; i  < pages.length; i++) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.join('pages/', projName, pages[i]),
            template: path.join(__dirname, 'src/pages', projName, pages[i]),
            inject: false,
        })
    );
}
module.exports = config;
