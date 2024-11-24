import path from 'path';
import {fileURLToPath} from 'url';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;

export default {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true, // Ensures the output directory is cleaned on each build
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {tag: 'img', attribute: 'src', type: 'src'},
                  {tag: 'img', attribute: 'data-src', type: 'src'},
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][hash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    ],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './private', to: 'private'}],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ensure this points to your HTML template
      filename: 'index.html', // Output to dist/index.html
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
      cacheGroups: {
        default: false,
        firebase: {
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          name: 'firebase',
          chunks: 'all',
          enforce: true,
        },
        fullcalendar: {
          test: /[\\/]node_modules[\\/](@fullcalendar)[\\/]/,
          name: 'fullcalendar',
          chunks: 'all',
          priority: 10,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    maxAssetSize: 400000,
    maxEntrypointSize: 400000,
  },
  devServer: {
    static: path.join(projectRoot, 'dist'),
    port: 8080,
    open: true,
    compress: true,
    hot: false,
  },
  stats: {
    children: true,
  },
};
