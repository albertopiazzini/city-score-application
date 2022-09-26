const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/javascript/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: { rules: [] },
  devServer: {},
};
