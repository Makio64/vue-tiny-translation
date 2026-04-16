import terser from '@rollup/plugin-terser'

export default [
  // ES Module build (dev — includes missing-key warnings)
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  },
  // Minified ES Module build (prod — terser strips dev warnings via pure_funcs)
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      file: 'dist/index.esm.min.js',
      format: 'es'
    },
    plugins: [terser({ compress: { pure_funcs: ['warn', 'clearWarned', 'console.warn'] } })]
  }
]
