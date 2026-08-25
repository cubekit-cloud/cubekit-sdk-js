import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import dts from 'rollup-plugin-dts';

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        // CJS consumers (webpack Node) can keep a minified file.
        plugins: [terser()],
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        // Do not minify ESM: Next.js Turbopack cannot see named exports in
        // `export{O as ApiClientError}` (one-line terser barrel) → compile 500.
      },
    ],
    external: ['react', 'react-dom', 'axios'],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      nodePolyfills(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.(css|less|scss)$/],
  },
];
