const webpack = require("webpack");

const isDev = true; //process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: [
    "@babel/polyfill", // enables async-await
    "./chromePrototype/popup.js"
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
