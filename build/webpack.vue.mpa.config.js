const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config ={
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname,'../dist'),
    },
    compress: true,
    port: 9001,
    hot: true 
  },
  entry: {
    index:path.resolve(__dirname, '../src/mpa/home.js'),
    login:path.resolve(__dirname, '../src/mpa/login.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname,'../dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test:/\.(png|svg|jpg|jpeg|gif)$/i,
        type:'asset',
        parser:{
          dataUrlCondition:{
            maxSize: 8 * 1024,
          }
        },
        generator:{
          filename:'images/[name].[hash:6][ext]'
        }
      },
      {
        test: /\.ejs$/,
        loader:'ejs-loader',
        options:{
          esModule:false
        }
      },
      {
        test: /\.vue$/,
        loader:'vue-loader'
      }
    ]
  },
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks:{
      minSize: 30 * 1024,
      chunks: 'all',
      name:'common',
      cacheGroups:{
        jquery:{
          name:'jquery',
          test: /jquery/,
          chunks:'all'
        },
        'lodash-es':{
          name:'lodash-es',
          test: /lodash-es/,
          chunks:'all'
        }
      }
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname, '../public/index.html'),
      chunks:['index'],
    }),
    new HtmlWebpackPlugin({
      filename:'login.html',
      template:path.resolve(__dirname, '../public/index.html'),
      chunks:['login'],
    }),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery'
    }),
    new CopyWebpackPlugin({
      patterns:[{
        from:path.resolve(__dirname, '../src/img/'),
        to: path.resolve(__dirname, '../dist/img/')
      }]
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
      chunkFilename:'css/[name].chunk.css'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ]
};

module.exports = config;