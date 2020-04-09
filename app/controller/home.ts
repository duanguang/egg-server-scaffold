import { Controller } from 'egg';
import { HttpClientResponse } from 'urllib';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async readHtmlString() {
    const { ctx } = this;
    /** 参数校验 */
    /* ctx.validate({
      target: { type: 'string' }
    }); */
    const { target } = this.ctx.query;
    console.log(target);
    /* const header = this.ctx.headers;
    const proxy = header['api-target']; */
    const result = await this.ctx.curl<HttpClientResponse<string>>(target, {
      dataType: 'text',
    });
    ctx.body = result.data.toString();
    ctx.response.body = result.data.toString();
     /*  ctx.res.write(result.data); */
  }
}
