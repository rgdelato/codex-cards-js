var path = require('path');
// var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

	entry: './src/index.js',

	output: {
		path: './build',
		filename: 'bundle.js'
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
			}
		]
	},

	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			xhtml: true,
			inject: true,
			minify: { removeComments: true, collapseWhitespace: true }
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
