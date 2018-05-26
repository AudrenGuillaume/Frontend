const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader" }
        },
        // HTML
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: { minimize: true }
            }]
        },
        // CSS
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        // SASS
        {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract({ use: "style-loader!css-loader!sass-loader" })
        },
        // FONTS
        {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: { loader: "url-loader" }
        },
        // BITMAPS
        {
            test: /\.(jpg|png|gif)$/,
            use: { loader: "url-loader" }
        },
        // SVG
        {
            test: /\.(svg)$/,
            use: ["babel-loader", "svg-react-loader"]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ template: "./src/index.html", filename: "./index.html" }),
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" })
    ]
};