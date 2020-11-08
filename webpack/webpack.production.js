const path =require("path")
const HTMLWebpackPluin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HTMLWebpackPluin({
    template: path.resolve(__dirname, '../src/index.html'),
    filename: 'index.html'
});
const cssPlugin = new MiniCssExtractPlugin({
    filename: 'main.css'
});


module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname, '../../backend/src/public')
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    plugins: [
        htmlPlugin,
        cssPlugin
    ]
};
