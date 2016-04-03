var path = require('path');


module.exports = {

	entry: './src/index.js',

	output: {
		path: './build',
		filename: 'bundle.js',
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
			}
		]
	},

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
