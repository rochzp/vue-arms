const path = require('path')
const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const minify = require('rollup-plugin-babel-minify');
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('./package.json').version
const banner =
`/*!
  * vue-arms v${version}
  * (c) ${new Date().getFullYear()} Roc
  * @license ISC
  */`

const resolve = _path => path.resolve(__dirname, './', _path)

const generateConfig = (opts) => {
  const config = {
    input: resolve('src/index.js'),
    plugins: [
      cjs(),
      node(),
      replace({
        __VERSION__: version
      })
    ],
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueArms'
    }
  }
  if (opts.env) {
    config.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (/min\.js$/.test(opts.file)) {
    config.plugins.push(minify());
  }

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }
  return config
}

module.exports = [
  {
    file: resolve('dist/vue-arms.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/vue-arms.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/vue-arms.common.js'),
    format: 'cjs',
  },
  {
    file: resolve('dist/vue-arms.esm.js'),
    format: 'es',
  },
  {
    file: resolve('dist/vue-arms.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false,
  },
  {
    file: resolve('dist/vue-arms.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false,
  }
].map(generateConfig)
