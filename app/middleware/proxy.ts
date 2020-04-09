/* import * as proxy from 'koa-proxy'; */

import { Context } from 'egg';
import * as proxy from 'koa-proxy';
import * as pathToRegexp from 'path-to-regexp';
const proxyConfig = [
  {
    match: pathToRegexp('/proxy/:url*', []),
    host: 'http://localhost:8081/',
    map: path => {
      const paths = path.replace(path, '/scm/index.html');
      return paths;
    },
  },
  {
    match: pathToRegexp('/common/:url*', []),
    host: 'http://localhost:8081/',
    map: path => {
        return path;
    },
  },
  {
    match: pathToRegexp('/lcm/:url*', []),
    host: 'http://localhost:8081/',
    map: path => {
        return path;
    },
  },
];
module.exports = () => {
  // tslint:disable-next-line: only-arrow-functions
  return async function(ctx: Context, next: () => Promise<any>) {
    const { app } = ctx;
    proxyConfig.map(async item => {
      app.get(
        item.match,
        proxy({
          host: item.host,
          map: item.map,
        }),
      );
      await next();
    });
    await next();
  };
};
