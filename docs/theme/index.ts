import { Sandbox } from 'vitepress-plugin-sandpack';
import DefaultTheme from 'vitepress/theme';

export default {
  ...DefaultTheme,
  enhanceApp(ctx: any) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('Sandbox', Sandbox);
  },
};
