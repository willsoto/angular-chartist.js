import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/angular-chartist.js',
  output: {
    name: 'angular-chartist',
    globals: {
      angular: 'angular',
      chartist: 'Chartist'
    },
    sourcemap: true,
    format: 'umd',
    file: 'dist/angular-chartist.js'
  },
  external: ['angular', 'chartist'],
  plugins: [
    eslint(),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions']
            },
            modules: false
          }
        ]
      ],
      plugins: [
        [
          'angularjs-annotate',
          {
            explicitOnly: true
          }
        ],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-json-strings',
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true
          }
        ],
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-throw-expressions'
      ]
    }),
    uglify(),
    filesize()
  ]
};
