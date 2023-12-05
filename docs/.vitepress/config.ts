import container from 'markdown-it-container';
import { defineConfig } from 'vitepress';
import { renderSandbox } from 'vitepress-plugin-sandpack';

// rule of 'html tag name' to 'component name'
// 'sanbox' -> 'Sandbox'
// 'my-sandbox' -> MySandbox
// 'sandbox-react-demo' -> SandboxReactDemo

export default defineConfig({
  // ...

  markdown: {
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, 'sandbox', {
          render (tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox');
          },
        });
    },
  },

  // ...
})