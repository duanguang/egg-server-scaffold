import { EggAppConfig, PowerPartial } from 'egg';
export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mongoose = {
    // url: 'mongodb://admin:admin@192.168.1.184:27017/bggood-application?authSource=admin',
    url: 'mongodb://frontEndDb:ylfyshlzds-gzzl@172.18.18.99:27017/frontEndDb',
    options: {},
  };
  return config;
};
