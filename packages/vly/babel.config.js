const vlyPackage = require('./package.json')

const env = process.env.NODE_ENV

module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false
    }]
  ],
  plugins: [
    ['transform-define', {
      __VLY_VERSION__: vlyPackage.version,
      __REQUIRED_VUE__: vlyPackage.peerDependencies.vue
    }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: true }
        }]
      ],
      plugins: [
        ['module-resolver', {
          root: ['./src'],
          alias: {
            '~components': 'components',
            '~directives': 'directives',
            '~mixins': 'mixins',
            '~scss': 'scss',
            '~util': 'util'
          }
        }]
      ]
    },
    es5: {
      presets: ['@babel/preset-env']
    },
    lib: {
      presets: [
        ['@babel/preset-env', {
          targets: 'last 1 chrome version',
          modules: false
        }]
      ]
    }
  }
}

if (['lib', 'es5'].includes(env)) {
  module.exports.plugins.push('./build/babel-transform-sass-paths.js')
}

if (env !== 'lib') {
  module.exports.plugins.push('@babel/plugin-proposal-object-rest-spread')
}
