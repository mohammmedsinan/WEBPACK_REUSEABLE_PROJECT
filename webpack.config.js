const path = require("path")
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const postcss = require('postcss');

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV == 'production') {
  mode = 'production';
  target = 'browserslist';
}

module.exports = {
  mode: mode,
  target: target,
  output: {
    path: path.resolve(__dirname , "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|gif|jpe?g)$/i,
        type: 'asset',
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin(),
    new HtmlWebpackPlugin({template: "./src/index.html" ,}),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
