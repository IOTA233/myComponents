import { defineConfig } from 'vite';
import { generateVueConfig } from '../build/build.config';

type Mode = 'package' | 'full' | 'full-min' | undefined;
export default defineConfig(({ mode }) => generateVueConfig({ mode }, {
  resolve: {
    alias: [
      {
        find: /^@zhdgps\/(.+)$/,
        replacement: join(__dirname, '..', 'packages', '$1', 'src'),
      },
    ],
  },
}));
