module.exports = {
  module: {
    rules: [
      {
        test: /\.ohm$/i,
        use: 'raw-loader',
      },
    ],
  },
};