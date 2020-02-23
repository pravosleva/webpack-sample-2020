const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test';

module.exports = {
  plugins: [cjs && '@babel/plugin-transform-modules-commonjs'].filter(Boolean),
}
