import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import multi from '@rollup/plugin-multi-entry';
import typescript from 'rollup-plugin-typescript2';
import svg from 'rollup-plugin-svg';
import json from '@rollup/plugin-json';

export default {
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  input: {
    include: ['src/components/**/*.ts'],
    exclude: [
      'src/components/**/*.stories.ts',
      'src/components/**/*.styles.ts',
      'src/components/**/*.test.ts',
      'src/components/examples/**/*',
      'src/components/utility/**/*',
    ],
  },
  output: [
    {
      file: 'dist/grace.js',
      format: 'esm',
    },
  ],
  plugins: [
    replace({ 'Reflect.decorate': 'undefined', 'preventAssignment': true }),
    resolve(),
    typescript(),
    json(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
    multi(),
    svg(),
  ],
}
