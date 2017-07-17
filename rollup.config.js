import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/angular-chartist.js',
  moduleName: 'angular-chartist',
  format: 'umd',
  dest: 'dist/angular-chartist.js',
  sourceMap: true,
  external: ['angular', 'chartist'],
  globals: {
    angular: 'angular',
    chartist: 'Chartist'
  },
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
