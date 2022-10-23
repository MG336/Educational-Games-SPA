const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};
// {develop}
module.exports = () => ({
  // mode: develop ? 'development' : 'production',
  // mode: 'production',
  mode: 'development',

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash:7][ext][query]',
    // clean: true,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
          filename: './styles/main.css'
      }),
    
  ],
  
  module: {
      rules: [
          {
              test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
              type: 'asset/resource'
          },
          {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[hash:7][ext][query]'
            }
          },
          {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader'
              ]
          },
          {
              test: /\.scss$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
              ]
          },
          {
            test: /\.html$/i,
            loader: 'html-loader'
        },
      ]
  },
  // ...devServer(develop),
});