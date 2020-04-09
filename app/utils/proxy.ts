/* import * as proxy from 'koa-proxy'; */

import * as pathToRegexp from 'path-to-regexp';
export const proxyConfig = [
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
