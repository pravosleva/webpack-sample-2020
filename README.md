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
- [ ] [Добавление плагинов для Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8555s)
- [ ] `@babel/polyfill` usage
```js
// ...
module.exports = {
  entry: {
    main: ['@babel/polyfill', './index.js'],
// ...
```
- [ ] [Компиляция TypeScript](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8668s)
- [ ] [Компиляция React JSX + оптимизация Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8840s)
