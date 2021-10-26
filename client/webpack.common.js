const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  // Use the src/scripts/index.js file as entry point to bundle it.
  // If the src/scripts/index.js file imports other JS files,
  // bundle them as well
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  // The bundles source code files shall result in a bundle.js file
  // in the /dist folder
  output: {
    // path: path.resolve(__dirname, './dist'),
    clean: true,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
  },
  // devtool will create source maps to help you with debugging of application
  devtool: 'inline-source-map',
  // The /dist folder will be used to serve our application
  // to the browser
  devServer: {
    static: path.resolve(__dirname, './dist'),
  },
  // Add plugins for webpack here
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
  ],
  // Integrate Babel in the build process
  // Define which files to use the loader
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/, // files to exclude
        use: ['babel-loader', 'eslint-loader']
      },
      // CSS and SASS
      {
        test: /\.(scss|css)$/,  // load files that end with scss and css
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: true
            }
          },
          {
          loader: 'sass-loader',
          }
        ],
      },
    ]
  },
  resolve: {
    // options for resolving module requests
    extensions: ['*', '.js']  // files to load
  }
};