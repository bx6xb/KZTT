const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = (env, argv) => {
  const isDev = argv.mode === "development"

  return {
    mode: argv.mode,
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "js/index.[contenthash].js",
      clean: true,
    },
    devServer: {
      open: true,
      port: 6900,
      watchFiles: "src/**/*",
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        isDev
          ? ""
          : {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
        {
          test: /\.woff2$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[contenthash][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        inject: "body",
        favicon: "./src/logo.webp",
      }),
      isDev
        ? ""
        : new MiniCssExtractPlugin({
            filename: "css/style.min.[contenthash].css",
          }),
      new CopyPlugin({
        patterns: [{ from: "./src/imgs", to: "./imgs" }],
      }),
    ],
  }
}
