import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default [
  // ES Module build
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    plugins: [resolve()]
  },
  // CommonJS build
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [resolve()]
  },
  // Minified ES Module build
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.min.js',
      format: 'es'
    },
    plugins: [resolve(), terser()]
  }
] 