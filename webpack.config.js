const path = require('path');
// Plugins - Доп функционал в видеклассов, который может быть добавлен к базовой
// конфигурации webpack
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    port: 8000,
  },
  context: path.resolve(__dirname, 'src'), // dir where source code is placed
  // mode: 'development', // Указано в package.json
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'], // Для автоопределения расширений при
    // импорте
    alias: { // Для поиска по дефолту при указании абсолютного пути при импорте
      // внутри модулей:
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
      '@alias-tst': path.resolve(__dirname, 'src/alias-tst'),
    },
  },
  plugins: [
    // Каждый плагин может быть добавлен в виде нового инстанса своего класса:
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
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
          'style-loader', // 2. Добавляет стили в секцию head
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
      }
    ]
  }
};
