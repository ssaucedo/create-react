import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

export default {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  stats: {
    colors: true,
    reasons: true, // if fail, show it very verbose
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'app/config/'),
      helpers: path.resolve(__dirname, 'app/helpers/'),
      modules: path.resolve(__dirname, 'app/modules/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
    ],
  },
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    quiet: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.resolve('./app/index.ejs'),
      inject: true,
    }),
  ],
}
