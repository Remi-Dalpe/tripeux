// webpack.config.js
import path from 'path';
import {fileURLToPath} from 'url';
import Dotenv from 'dotenv-webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), '.');

export default {
  entry: path.join(projectRoot, 'src', 'index.js'),
  mode: 'production',
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      threshold: 8192, // Only compress files larger than 8KB
    }),
  ],
  devServer: {
    static: {
      directory: path.join(projectRoot, 'public'), // Folder to serve static files from
      watch: true, // Enable watching for changes in the static files
    },
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Open the browser automatically
    port: 4000, // The port to run the dev server on
    compress: true, // Enable compression for the server
    watchFiles: ['public/**/*'], // Watch all files in the 'public' directory
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000, // Split chunks larger than 200KB
      cacheGroups: {
        firebase: {
          test: /[\\/]node_modules[\\/](firebase)[\\/]/,
          name: 'firebase',
          chunks: 'all',
          priority: 10,
        },
        fullcalendar: {
          test: /[\\/]node_modules[\\/](@fullcalendar)[\\/]/,
          name: 'fullcalendar',
          chunks: 'all',
          priority: 10,
        },
      },
    },
  },
  performance: {
    hints: 'warning', // 'error' to enforce, or 'warning' to notify without blocking
    maxAssetSize: 300000, // Set the max size for assets (in bytes)
    maxEntrypointSize: 300000, // Set the max size for entry points (in bytes)
  },
};
