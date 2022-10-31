// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelPluginApiDoc = require('./scripts/babel-plugin-apiDoc');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    babelPluginApiDoc
  ]
};
