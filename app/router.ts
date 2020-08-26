import { Application } from 'egg';
import * as proxy from 'koa-proxy';
import * as pathToRegexp from 'path-to-regexp';
/* import * as bodyparser from 'koa-bodyparser'; */
export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);

  // @ts-ignore
  app.io.route('send', app.io.controller.author.index);
  // @ts-ignore
  app.io.of('/socket/auth').route('send', app.io.controller.author.index);
  // @ts-ignore
};
