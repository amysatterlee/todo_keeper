const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', "./app/src/index.tsx"], // this is the entry point of javascript and the start of the bundle
  output: {
    path: path.resolve(__dirname, "app/dist"), // this is the absolute path that the bundled javascript will be saved
    filename: "bundle.js", // this is the filename for the bundled javascript
    publicPath: '/dist/' // this is the public path of where the static content will be served from
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "util": false
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.tsx$/,
        use: "ts-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "app"), // this is where the static content resides (that which is not being bundled including index.html)
      publicPath: '/' // this is the public path of where the static content will be served from
    },
    watchFiles: 'app/src/**',
    historyApiFallback: true // this will redirect 404's to the root index.html
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
