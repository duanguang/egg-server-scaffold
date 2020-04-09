import { Controller } from 'egg';
import * as fs from 'fs';
import * as path from 'path';
interface IPrams {
    token: string;
    authApi: string;
}
interface IResponse {
    data: Buffer;
    res: {
        status: number;
    };
}
export default class AuthorController extends Controller {
  public async index() {
      const { ctx } = this;
      if (this.ctx.args && Array.isArray(this.ctx.args)) {
        const Authorization = this.ctx.args[0] as IPrams;
        const opts = {
            headers: { Cookie: Authorization.token },
            dataType: 'application/json',
            timeout: 40000,
        };
        const result = await this.ctx.curl<IResponse>(Authorization.authApi, opts);
        const socketResult = {
            userEntity: JSON.stringify(result.data.toString()),
            status: result.res.status,
        };
        const file = path.join(process.cwd(), '/app/cache/table/test.json');
        /* console.log(file); */
       /*  fs.writeFileSync(file, 'content'); */
        await this.ctx.socket.emit('message', socketResult);
      }
  }
}
