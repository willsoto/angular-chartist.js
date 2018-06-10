import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import eslint from 'rollup-plugin-eslint';
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
        '@babel/stage-2',
        [
          '@babel/env',
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
        ]
      ]
    }),
    uglify(),
    filesize()
  ]
};
