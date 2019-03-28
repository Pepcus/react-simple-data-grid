const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  watch: true,
  entry: ['babel-polyfill', './demo/index.js'],
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './demo/index.html',
      filename: './index.html',
    }),
  ],
};
