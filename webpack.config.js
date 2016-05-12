var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

	entry: './src/index.js',

	output: {
		path: './build',
		filename: 'script.[hash].js',
		publicPath: '/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'test')
				],
				loaders: ['babel']
			},
			{ test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract("style", "css!sass") },
			{ test: /\.json$/, loader: 'json' }
		]
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			xhtml: true,
			inject: true,
			minify: { removeComments: true, collapseWhitespace: true }
		}),
		new ExtractTextPlugin("style.[hash].css"),
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
	],

	devServer: {
		quiet: false,
		noInfo: false,
		stats: {
			// Config for minimal console.log mess.
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}
};
