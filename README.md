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
- [x] [Зачем нужен Babel](https://youtu.be/eSaF8NXeNsA?t=7861)
- [x] [Добавление плагинов для Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8555s)
```
npm i -D babel-loader @babel/core
```
- [x] [Babel: Пресеты и плагины](https://youtu.be/eSaF8NXeNsA?t=8153)
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
- [x] `@babel/plugin-proposal-class-properties`
> **class** - Пока еще не стандарт языка (только предложение)
- [ ] [Компиляция TypeScript](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8668s)
```
npm i -D @babel/preset-typescript
```
- [x] [Компиляция React JSX + оптимизация Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8840s)
```
npm i -D @babel/preset-react
```
_`webpack.config.js`_
```
// ...
const babelOptions = preset => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) opts.presets.push(preset);

  return opts;
};
// ...
module: {
  rules: [
    // ...
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: {
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-react'),
      },
    },
  ]
}
```
- [x] source-map for dev mode
- [x] ESLint
```
npm i -D eslint-loader
npm i -D babel-eslint
npm i -D eslint
npm i -D babel-eslint

```
_`webpack.config.js`_
```js
// ...
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  if (isDev) loaders.push('eslint-loader');

  return loaders;
};
// ...
module = {
  rules: [
    // ...
    { // Babel: Пропускаем все .js через babel-loader (кроме node_modules)
      test: /\.js$/,
      exclude: /node_modules/,
      loader: jsLoaders(), // Уже с учетом eslint-loader
    },
    // ...
  ],
};
```
_`.eslintrc`_
```js
{
  "parser": "babel-eslint", // По умолчанию eslint не знает, что мы работаем с
  // babel. Указываем это явно как парсер.
  "rules": {
    "no-used-vars": "warn"
  },
  "env": { // Указываем явно где мы работаем с eslint
    "es6": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended"
  ]
}
```
- [x] [Dynamic imports usage sample (lazy loading)](https://youtu.be/eSaF8NXeNsA?t=9785)
```
npm i lodash
```
_`sample.js`_
```
// ...
import('lodash').then(_ => {
  console.log('Lodash', _.random(0, 42, true));
});
```
> After build we have additional separate chunk `dist/[name].js`
- [x] [webpack-bundle-analyzer usage]()
> Плагин для анализа библиотек для оптимизации приложения
```
npm i webpack-bundle-analyzer -D
```
_`webpack.config.js`_
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// ...
const plugins = () => {
  const base = [
    // Каждый плагин может быть добавлен в виде нового инстанса своего класса:
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd, // Для максимальной оптимизации выходных
        // файлов
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([ // Для каждого элемента копирования указываем объект
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new MiniCssExtractPlugin({ // Для формирование файла со стилями
      filename: filename('css'),
    }),
  ];

  if (isProd) base.push(new BundleAnalyzerPlugin());

  return base;
};
// ...
module: {
  // ...
  plugins: plugins(),
}
```
> After `npm run build:prod` we have working server on [127.0.0.1](http://127.0.0.1:8888) to see analysis.
> And also you can use `npm run stats` for have `stats.json` file as result.
