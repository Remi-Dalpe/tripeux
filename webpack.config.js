import path from 'path';
import {fileURLToPath} from 'url';
import Dotenv from 'dotenv-webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), '.');

const isCI = process.env.CI === 'true';

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
    !isCI && new BundleAnalyzerPlugin(), // Enable only if not in CI
    new CompressionPlugin({
      test: /\.(js|css)$/,
      threshold: 8192,
    }),
  ].filter(Boolean), // Filter out null plugins (like BundleAnalyzerPlugin in CI)
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
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
    hints: 'warning',
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
};
