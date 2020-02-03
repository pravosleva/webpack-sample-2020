import './css/styles.css';
// import WebpackLogo from './assets/webpack-logo.png'; // For example
import WebpackLogo from '@/assets/webpack-logo.png';
import tst from '@alias-tst/tst';
import './babel';
import React from 'react';
import { render } from 'react-dom';

tst();
console.log(WebpackLogo); // abd62e9b6096047730911a83833b04b6.png

const App = () => (
  <div>Hello jsx</div>
);

render(<App />, document.getElementById('app'));

// Dynamic import sample: npm i lodash
// import('lodash').then(_ => {
//   console.log('Lodash', _.random(0, 42, true));
// });
