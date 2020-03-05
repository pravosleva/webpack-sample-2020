const path = require('path');
// Plugins - Доп функционал в виде классов, который может быть добавлен к
// базовой конфигурации webpack
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// For prod only:
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties', // class - это еще не
      // стандарт языка (только предложение)
    ],
  }

  if (preset) opts.presets.push(preset);

  return opts;
};
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  if (isDev) loaders.push('eslint-loader');

  return loaders;
};
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

  if (isProd) base.push(new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
  }));

  return base;
};

module.exports = {
  devServer: {
    port: 8000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  context: path.resolve(__dirname, 'src'), // dir where source code is placed
  // mode: 'development', // Указано в package.json
  entry: {
    main: [
      '@babel/polyfill', // Для async/await одних пресетов недостаточно (нужно
      // установить полифил)
      './index.jsx',
    ],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'], // Для автоопределения расширений при
    // импорте
    alias: { // Для поиска по дефолту при указании абсолютного пути при импорте
      // внутри модулей:
      '@': path.resolve(__dirname, 'src'),
      '@alias-tst': path.resolve(__dirname, 'src/alias-tst'),
    },
  },
  optimization: optimization(),
  plugins: plugins(),
  module: {
    // webpack понимает только js, json
    // Требуется расширение функционала: сущность loader - возможность работы с
    // другими типами файлов, к примеру, с css.
    rules: [
      { // Объект, описывающий тип лоадера:
        // Смысл: Для файлов, попадающихся в качестве импорта и расширения
        // которых соответствуют данному паттерну, использовать конкретный тип
        // лоадеров:
        test: /\.css$/, // Тип лоадеров для .css
        use: [
          // 'style-loader', // 2.v1 Добавляет стили в секцию head
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          }, // 2.v2
          'css-loader', // 1. Для импортов .css в файлы .js
        ], // Порядок важен! webpack идет справа налево (сверху вниз)
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      { // Babel: Пропускаем все .js через babel-loader (кроме node_modules)
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      { // React
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
          },
          // 'eslint-loader',
        ],
      },
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
    ]
  }
};
