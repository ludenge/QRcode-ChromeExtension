const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve("src/manifest.json"),
          to: `${path.resolve("dist")}/manifest.json`
        },
        {
          from: path.resolve("./public/img"),
          to: path.resolve("./dist/img")
        },
      ]),
    ]
  }
};
