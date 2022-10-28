import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

const resolve = p => path.resolve(__dirname, p);
const isDev = process.env.NODE_ENV === 'development';
const extensions = ['.ts', '.js', '.json'];

export default {
  input: './src/index',
  output: [
    {
      file: resolve('lib/index.cjs.js'),
      format: 'cjs',
      exports: 'default'
    },
    {
      file: resolve('lib/index.esm.js'),
      format: 'es'
    },
    {
      file: resolve('lib/index.global.js'),
      format: 'umd',
      name: 'CmqUtils',
      exports: 'default'
    }
  ],
  plugins: [
    nodeResolve({
      extensions,
      exclude: '**/node_modules/**'
    }),
    commonjs(),
    babel({
      extensions,
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    terser(),
    cleanup(),
    ...(isDev
      ? [
          serve({
            contentBase: '',
            openPage: '/public/index.html',
            open: true,
            port: 3000
          }),
          livereload('lib')
        ]
      : []),
    del({ targets: 'lib/*' })
  ]
};
