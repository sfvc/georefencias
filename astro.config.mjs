import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [react()],

  devToolbar: {
    enabled: false,
  },

  adapter: netlify(),
});