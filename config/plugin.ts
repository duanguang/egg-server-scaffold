import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  security : true,
  validate : {
    enable: true,
    package: 'egg-validate',
  },
  'egg-cors': true,
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  io: {
    enable: true,
    // @ts-ignore
    package: 'egg-socket.io',
  },
};

export default plugin;
