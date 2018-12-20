const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

module.exports = {
  mode: 'development',
  entry: {
	  main: './src/index.js'
  },
  output: {
    path: __dirname + '/public',
	chunkFilename: '[name].js',
    filename: '[name].js'
  },
  devServer: {
     contentBase: './public'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
		default: false,
		vendors: false,
        vendor: {
          chunks: 'all',
		  test: /node_modules/,
		  name: 'vendor'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      },
	  {
		test: /\.css$/,
		use: ['style-loader', 'css-loader'],
	  }
    ]
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      template: 'index.html'
    }),*/
	new webpack.DefinePlugin({
	  //'process.env.NODE_ENV': isDevelopment ? '"development"' : '"production"',
	  'process.env.BROWSER': JSON.stringify(true)
	  //__DEV__: isDevelopment
	}),
	new reactLoadablePlugin({
      filename: './react-loadable.json',
    })
  ],
  resolve: {
	extensions: ['.js', '.jsx']
  }
};