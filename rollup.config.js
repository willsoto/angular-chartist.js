import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import eslint from 'rollup-plugin-eslint';

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
        'stage-2',
        [
          'env',
          {
            targets: {
              browsers: ['last 2 versions']
            },
            modules: false
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    filesize()
  ].filter(plugin => !!plugin)
};
