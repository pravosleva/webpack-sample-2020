import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import tst from '@alias-tst/tst';
import App from '@/App.jsx';
import store from '@/store';
import '@/css/styles.css';
// import WebpackLogo from '@/assets/webpack-logo.png';

tst();
// console.log(WebpackLogo); // abd62e9b6096047730911a83833b04b6.png

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// Dynamic import sample: npm i lodash
// import('lodash').then(_ => {
//   console.log('Lodash', _.random(0, 42, true));
// });
