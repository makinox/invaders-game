const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Memory game',
      template: path.resolve(__dirname, 'src/template/index.html'),
    }),
    new WebpackPwaManifest({
      name: 'Invaders game',
      short_name: 'Invaders game',
      description: 'Invaders game - Jesus bossa',
      background_color: '#ffffff',
      crossorigin: 'anonymous',
      ios: true,
      icons: [
        {
          src: path.resolve('assets/enemy.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
        {
          src: path.resolve('assets/enemy.png'),
          size: '1024x1024',
        },
        {
          src: path.resolve('assets/enemy.png'),
          size: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
