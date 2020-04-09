import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560410762654_9651';

  // add your egg config in here
  config.middleware = [ ];
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [
      '.hoolinks.com',
      'http://localhost:9899',
      'http://localhost:8082',
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:8002',
      'http://localhost:8004',
      'http://localhost:8005',
      'http://localhost:8006',
    ],
  };

  config.cors = {
    credentials: true,
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [ 'connection', 'packet' ],
      },
      '/socket/auth': { // 鉴权通道
        connectionMiddleware: [],
        packetMiddleware: [ 'connection', 'packet' ],
      },
      '/socket/export-task': { // 鉴权通道
        connectionMiddleware: [],
        packetMiddleware: [ 'connection' ],
      },
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
