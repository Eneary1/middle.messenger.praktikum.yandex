const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: './static/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project-name.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss']
  },
  plugins: [
	new HtmlWebpackPlugin({
		title: 'Messenger',
		template: './static/index.html',
		favicon: './static/d.png'
	  }),
	new MiniCssExtractPlugin({
		filename: isDevelopment ? '[name].css' : '[name].[hash].css',
		chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
	})
  ],
  devServer: {
	proxy: [
    {
      context: ['/proxy-api/**'],
      target: 'https://proxy-api/api/',
      pathRewrite: { '^/api/': '/' },
      secure: false,
      onProxyReq: proxyReq => {
        proxyReq.setHeader('Host', 'my-custom-host');
      },
    },
  ],
    https: true,
	hot: true,
	port: 3000
  },
  module: {
    rules: [
    { 
      test: /\.hbs$/, 
      use: [
        {
          loader: 'handlebars-loader',
          options: {
            rootRelative: true,
          }
        }
      ]
    },
		{
			test: /\.d\.ts$/,
			loader: 'ignore-loader'
		},
    {
      test: /(?<!\.d)\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
      ],
      exclude: /(node_modules)/
    },
	  {
        test: /\.module\.scss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(scss)$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  }
}; 