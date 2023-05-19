const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: './src/indexUser.tsx',
  devServer: {
    static: {
      directory: path.join(__dirname, 'bundle'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loader: 'file-loader',
        options: {
          bypassOnDebug: true,
          disable: true,
          name: '[name].[hash].[ext]',
          outputPath: 'static/media',
        },      
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
     new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '**/*',
    //       context: path.resolve(__dirname, 'src', 'assets'),
    //       to: './assets',
    //     },
    //   ],
    // }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style-[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'static/js/bundle-[hash].js',
    path: path.resolve(__dirname, 'bundle'),
    publicPath: '/'
  },
};