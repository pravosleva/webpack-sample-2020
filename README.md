# webpack-sample-2020

## Roadmap

- [x] js chunks
- [x] css-loader, style-loader
- [x] file-loader
- [x] alias
- [x] optimization
- [ ] [less](#less) - [Подключение LESS](https://youtu.be/eSaF8NXeNsA?t=7153)
- [ ] [scss](#scss) - [Подключение SCSS](https://youtu.be/eSaF8NXeNsA?t=7568)
- [ ] [preprocessing](#preprocessing) - [Препроцессоры, Оптимизация конфига](https://youtu.be/eSaF8NXeNsA?t=7703)
- [x] [Зачем нужен Babel](https://youtu.be/eSaF8NXeNsA?t=7861)
- [x] [babel-pugins](#babel-pugins) - [Добавление плагинов для Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8555s)
- [x] [babel-presets](#babel-presets) - [Babel: Пресеты и плагины](https://youtu.be/eSaF8NXeNsA?t=8153)
- [x] [babel-polyfill](#babel-polyfill) - `@babel/polyfill` (as lib) usage
- [x] `@babel/plugin-proposal-class-properties` [local link](#plugin-proposal-class-properties)
- [x] [typescript](#typescript) - [Компиляция TypeScript](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8668s)
- [x] [preset-react](#preset-react) - [Компиляция React JSX + оптимизация Babel](https://www.youtube.com/watch?v=eSaF8NXeNsA&t=8840s)
- [x] source-map for dev mode
- [x] [ESLint](#eslint)
- [x] [dynamic-imports](#dynamic-imports) - [Dynamic imports usage sample (lazy loading)](https://youtu.be/eSaF8NXeNsA?t=9785)
- [x] [webpack-bundle-analyzer](#webpack-bundle-analyzer)
- [x] [postbuild-script-sample](#postbuild-script-sample)
- [ ] [styled-components](#styled-components)
- [ ] [webpack-dashboard](#webpack-dashboard)
- [x] [error-overlay-webpack-plugin](#error-overlay-webpack-plugin)

### less
```
npm i -D less-loader
```

### scss
```
npm i -D node-sass sass-loader
```

### preprocessing
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
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      }
    ],
  },
  // ...
};
```

### babel-pugins
```
npm i -D babel-loader @babel/core
```

### babel-presets
> **Пресет** - Набор плагинов, для работы с js в современном формате.
```
npm i -D @babel/preset-env
```
_`webpack.config.js`_
```js
// ...
module.exports = {
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
            presets: ['@babel/preset-env'],
          },
        },
      }
    ],
  },
}
```
_`package.json`_
```json
"browserlist": "> 0.25%, not dead",
```

### babel-polyfill
> Для async/await одних пресетов недостаточно (нужно установить полифил).
```js
// ...
module.exports = {
  entry: {
    main: ['@babel/polyfill', './index.js'],
// ...
```

### plugin-proposal-class-properties
> **class** - Пока еще не стандарт языка (только предложение)

### typescript
```
npm i -D @babel/preset-typescript
```
_`webpack.config.js`_
```js
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      { // TypeScript
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Адаптация под разные браузеры
              '@babel/preset-typescript',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      { // TypeScript + React
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      // ...
    ]
  }
// ...
}
```

### preset-react
```
npm i -D @babel/preset-react
```
_`webpack.config.js`_
```js
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
module.exports = {
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
    ],
  },
}
```

### eslint
```
npm i -D eslint-loader babel-eslint eslint babel-eslint
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
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      { // Babel: Пропускаем все .js через babel-loader (кроме node_modules)
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(), // Уже с учетом eslint-loader
      },
      // ...
    ],
  },
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

### dynamic-imports
```
npm i lodash
```
_`sample.js`_
```js
// ...
import('lodash').then(_ => {
  console.log('Lodash', _.random(0, 42, true));
});
```
> After build we have additional separate chunk `dist/[name].js`

### webpack-bundle-analyzer
> Плагин для анализа библиотек для оптимизации приложения
```
npm i webpack-bundle-analyzer -D
```
_`webpack.config.js`_
```js
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
module.exports = {
  // ...
  module: {
    // ...
    plugins: plugins(),
  }
  // ...
}
```
> After `npm run build:prod` we have working server on [127.0.0.1](http://127.0.0.1:8888) to see analysis.
> And also you can use `npm run stats` for have `stats.json` file as result.

### postbuild-script-sample
_`webpack.config.js`_
```js
// ...
const plugins = () => {
  // ...
  if (isProd) base.push(new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
  }));
  return base;
};
```
_`package.json`_
```js
"scripts": {
  "postbuild": "bash postbuild.sh",
  // ...
  "build:prod": "cross-env NODE_ENV=production webpack --mode production && npm run postbuild",
  // ...
},
```
_`postbuild.sh`_
```bash
echo "HELLO POSTBUILD SCRIPT"
echo $?

echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
echo -ne '#######################   (100%)\r'
echo -ne '\n'

exit 0
```

### styled-components
```
npm i -D babel-plugin-styled-components styled-components
```
_`webpack.config.js`_
```js
// ...
const babelOptions = preset => {
  const opts = {
    // ...
    plugins: [
      // ...
      'babel-plugin-styled-components',
      // See also https://styled-components.com/docs/tooling#usage
    ],
  }
  // ...
  return opts;
};
// ...
```

### webpack-dashboard
```bash
npm i -D webpack-dashboard
```
_`webpack.config.js`_
```js
// ...
const DashboardPlugin = require('webpack-dashboard/plugin');
// ...
const plugins = () => {
  // ...
  if (isDev) {
    // ...
    base.push(new DashboardPlugin());
  }
  return base;
};
```

### error-overlay-webpack-plugin
```bash
npm i -D error-overlay-webpack-plugin
```
_`webpack.config.js`_
```js
// ...
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
// ...
const plugins = () => {
  // ...
  if (isDev) {
    // ...
    base.push(new ErrorOverlayPlugin());
  }
  return base;
};
```
