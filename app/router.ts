import { Application } from 'egg';
import * as proxy from 'koa-proxy';
import * as pathToRegexp from 'path-to-regexp';
/* import * as bodyparser from 'koa-bodyparser'; */
export default (app: Application) => {
  const { controller, router } = app;

  router.post('/readTempleteHtml', controller.lcm.getTemp);
  router.get('/readHtmlString', controller.home.readHtmlString);
  router.get('/', controller.home.index);
  router.post('/table/edit', controller.table.edit);
  router.get('/table/query', controller.table.query);
  router.post('/monitoring/report', controller.monitoring.report);
  router.post(
    '/scheduleReport/saveScheme',
    controller.scheduleReport.customize,
  );
  router.get('/scheduleReport/queryScheme', controller.scheduleReport.query);
  router.post('/scheduleReport/deleteScheme', controller.scheduleReport.delete);
  router.post('/scheduleReport/setDefaultScheme', controller.scheduleReport.setDefault);
  router.post('/tableScheme/save', controller.scheduleReport.saveTableScheme);
  router.get('/tableScheme/query', controller.scheduleReport.queryTableScheme);
  router.post(
    '/proxy/logisticsCollaboration/addAddress',
    controller.logisticsCollaboration.addAddress,
  );
  router.get(
    '/proxy/logisticsCollaboration/queryAddress',
    controller.logisticsCollaboration.queryAddress,
  );
  router.post(
    '/proxy/logisticsCollaboration/editAddress',
    controller.logisticsCollaboration.editAddress,
  );
  router.post(
    '/proxy/logisticsCollaboration/deleteAddress',
    controller.logisticsCollaboration.deleteAddress,
  );
  router.post(
    '/proxy/customsBaseData/query',
    controller.customs.queryBaseData,
  );
  /* 沙箱资源获取 */
  router.get('/sandbox/getScript', controller.sandbox.getScript);

  /* 公用数据保存接口 */
  router.post('/generadatasave/save', controller.generadatasave.save);
  router.post('/generadatasave/search', controller.generadatasave.search);
  router.post('/generadatasave/collection', controller.generadatasave.collection);

  // @ts-ignore
  app.io.route('send', app.io.controller.author.index);
  // @ts-ignore
  app.io.of('/socket/auth').route('send', app.io.controller.author.index);
  // @ts-ignore
  app.io.of('/socket/export-task').route('send', app.io.controller.exporttask.index);
  // @ts-ignore
  /* app.io.of('/socket/export-task', app.io.controller.exporttask.index); */
  /* app.get(
    pathToRegexp('/(proxy|common|scm)/:url*', []),
    proxy({
      host: 'http://localhost:8081/',
      map: (path: string) => {
        if (path.indexOf('proxy') > -1) {
          const url = path.replace('/proxy', '');
          return path.replace(path, url);
        }
        return path;
      },
    }),
  );
  app.get(
    pathToRegexp('/https://uat-scm.hoolinks.com/:url*', []),
    proxy({
      host: 'https://uat-scm.hoolinks.com',
      map: (path: string) => {
        if (path.indexOf('/https://uat-scm.hoolinks.com') > -1) {
          const url = path.replace('/https://uat-scm.hoolinks.com', '');
          return url;
        }
        return path;
      },
      requestOptions: (request, opt) => {
        console.log(opt);
        opt['headers']['cookie'] = 'SESSION=c63685e8-63c1-42d4-b1de-ad5961a5eb4a';
        console.log('======', request)
        return opt;
      },
      jar: true,
    }),
  );
  app.get(
    pathToRegexp('/(proxy|assets|scm|order)/:url*', []),
    proxy({
      host: 'https://uat-scm.hoolinks.com',
      map: (path: string) => {
        if (path.indexOf('/https://uat-scm.hoolinks.com') > -1) {
          const url = path.replace('/https://uat-scm.hoolinks.com', '');
          return url;
        }
        return path;
      },
      jar: true,
      requestOptions: (request, opt) => {
        console.log(opt.url);
        request = request;
        opt['headers']['cookie'] = 'SYSSOURCE=SCM; Hm_lvt_c255ba4153ae8ae8b787c209cc7518a8=1559530127,1561355079; cookie_token=4922; SCP_JSESSIONID=729A7C241E36D34AD72BBE558BA62CC0; Hm_lpvt_c255ba4153ae8ae8b787c209cc7518a8=1561476348; SESSION=59b0e064-7599-44b7-aaa5-73b783becf3d';
        return opt;
      },
    }),
  ); */
};
