const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
}

module.exports = {
	entry: './app/app.js',
	output: {
		path: PATHS.build,
		filename: 'app.bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
				},
			},
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['build'], {}),
		new HtmlWebpackPlugin({
			template: path.resolve('./app/index.ejs'),
			inject: true,
		}),
	],
	stats: {
		colors: true,
	},
	devtool: 'source-map',
	devServer: {
		contentBase: PATHS.build,
		hot: true,
		inline: true,
		quiet: true,
		historyApiFallback: true,
	},
}
