import { Controller } from 'egg';

export default class LcmController extends Controller {
  /** 提供lcm资源 */
  public async getTemp() {
    const { ctx } = this;
    /** 参数校验 */
    ctx.validate({
      host: { type: 'string' },
      path: { type: 'string' },
    });
    const { host, path } = ctx.request.body;
    const res = await ctx.service.lcm.loadEntryFile(host, path);
    ctx.body = res;
  }
}
