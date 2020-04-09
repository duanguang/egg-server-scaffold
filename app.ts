import { Application, IBoot } from 'egg';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
    const ctx = await this.app.createAnonymousContext();
    await ctx.service.customs.queryBaseData(
      {
        tableName: 'm_port_code',
        param: '',
        pageIndex: 1,
        pageSize: 10,
      },
      {
        session: '36C48168BABA9D6C8194A36493EB8EDB',
        reqHost: '192.168.200.22:8087',
      },
    );
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
