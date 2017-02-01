const cssLoaderOptions = '?modules=true&localIdentName=[folder]_[hash:base64:5]';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    devTool: 'inline-source-map',
    path: __dirname + '/public'
  },
  devServer: {
    inline: true,
    progress: true,
    colors: true,
    contentBase: './public'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel!eslint'
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        loader: `style!css?${cssLoaderOptions}!postcss!less`
      },
      {
        test: /\.json/,
        loader: 'json'
      }
    ]
  },
  postcss: () => [
    require('autoprefixer')
  ]
};
