import { defineConfig } from "cypress";
import { init, seed, teardown } from './test/db';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log('LOG FROM TASK', message);
          return null;
        },
        'db:init': async () => {
          await init();
          return null;
        },
        'db:seed': async () => {
          await seed();
          return null;
        },
        'db:teardown': async () => {
          await teardown();
          return null;
        },
      })
    },
    baseUrl: 'http://localhost:3000',
  },
});
