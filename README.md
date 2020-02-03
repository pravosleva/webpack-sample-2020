# webpack-sample-2020

## Roadmap

- [x] js chunks
- [x] css-loader, style-loader
- [x] file-loader
- [x] alias
- [x] optimization
- [ ] [Подключение LESS](https://youtu.be/eSaF8NXeNsA?t=7153)
```
npm i -D less-loader
```
- [ ] [Подключение SCSS](https://youtu.be/eSaF8NXeNsA?t=7568)
```
npm i -D node-sass sass-loader
```
- [ ] [Препроцессоры: Оптимизация конфига](https://youtu.be/eSaF8NXeNsA?t=7703)
```js
const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (extra) loaders.push(extra);

  return loaders;
};
// ...
module.exports = {
  rules: [
    // ...
    {
      test: /\.less$/,
      use: cssLoaders('less-loader'),
    }
  ]
// ...
```
- [ ] [Зачем нужен Babel](https://youtu.be/eSaF8NXeNsA?t=7861)
- [x] [Добавление плагинов для Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8555s)
```
npm i -D babel-loader @babel/core
```
- [ ] [Babel: Пресеты и плагины](https://youtu.be/eSaF8NXeNsA?t=8153)
> **Пресет** - Набор плагинов, для работы с js в современном формате.
```
npm i -D @babel/preset-env
```
_`webpack.config.js`_
```js
// ...
module: {
  rules: [
    // ...
    { // Babel: Пропускаем все .js через babel-loader (кроме node_modules)
      test: /\.js$/,
      exclude: /node_modules/,
      loader: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
        },
      },
    }
  ]
}
```
_`package.json`_
```json
"browserlist": "> 0.25%, not dead",
```
- [x] `@babel/polyfill` (as lib) usage
> Для async/await одних пресетов недостаточно (нужно установить полифил).
```js
// ...
module.exports = {
  entry: {
    main: ['@babel/polyfill', './index.js'],
// ...
```
- [ ] [Компиляция TypeScript](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8668s)
- [ ] [Компиляция React JSX + оптимизация Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8840s)
