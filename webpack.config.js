const fs = require('fs');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcss = require('postcss');
const cssnano = require('cssnano');
const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');
const criticalSplit = require('postcss-critical-split');


module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  watch: process.env.NODE_ENV !== 'production',
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')(),
                  require('css-mqpacker')(),
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                minimize: false,
                outputStyle: 'expanded'
              }
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {from: `./src/images`, to: `../images`, noErrorOnMissing: true},
          {from: `./src/fonts`, to: `../fonts`, noErrorOnMissing: true}
        ]
      }
    ),
    new PostCssPipelineWebpackPlugin({
      predicate: (css) => {
        return css === '../css/index.css';
      },
      processor: postcss([
        criticalSplit({
          output: criticalSplit.output_types.CRITICAL_CSS,
          modules: ['index'],
        })
      ]),
      suffix: 'critical',
    }),
    new PostCssPipelineWebpackPlugin({
      predicate: (css) => {
        return css === '../css/index.css';
      },
      processor: postcss([
        criticalSplit({
          output: criticalSplit.output_types.REST_CSS,
          modules: ['index'],
        })
      ]),
      suffix: '',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new PostCssPipelineWebpackPlugin({
        suffix: '',
        processor: postcss([
          cssnano({})
        ]),
      }),
    ]
  },
};

