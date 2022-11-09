const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   plugins: [new HtmlWebpackPlugin()],
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
   },
   module: {
      rules: [
         {
            test: /\.(scss)$/,
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' },
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: () => [require('autoprefixer')]
                     }
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sassOptions: {
                        quietDeps: true
                     }
                  }
               }
            ]
         }
      ]
   }
};