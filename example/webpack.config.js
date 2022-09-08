const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelConfig = {
  cacheDirectory: true,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "Firefox ESR", "> 1%", "not ie 11"],
        },
      },
    ],
    "@babel/preset-typescript",
  ],
};

/** @type {import('webpack').Configuration} */

module.exports = {
  mode: "development",
  entry: path.resolve("./src/index.ts"),
  output: {
    path: __dirname,
    filename: "../docs/build.js",
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "babel-loader",
            options: babelConfig,
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
              happyPackMode: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".md"],
  },
  devServer: {
    port: 3333,
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/index.html" }],
    },
    hot: true,
    open: true,
  },
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
};
