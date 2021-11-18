module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ios.ts', '.android.ts', '.js', '.json', '.ts', '.tsx'],
        root: ['./src']
      }
    ],
  ]
}
