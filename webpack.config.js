
module.exports = {

	entry: './src/index.js',

	output: {
		path: './build',
		filename: 'bundle.js',
		publicPath: '/build/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
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
