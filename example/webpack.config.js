module.exports = {
  entry: './index.js',
  target: 'electron',
  output: {
    filename: 'build.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["react", "env"],
            plugins: [
              ["transform-react-jsx", {"pragma":"h"}]
            ]
          }
        }
      }
    ]
  },
  externals: {
    leveldown: true
  }
}
