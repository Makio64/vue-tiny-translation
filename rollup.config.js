import terser from '@rollup/plugin-terser'

export default [
  // ES Module build
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  },
  // CommonJS build
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  // Minified ES Module build (for CDN usage via unpkg/jsdelivr)
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.min.js',
      format: 'es'
    },
    plugins: [terser()]
  }
]
