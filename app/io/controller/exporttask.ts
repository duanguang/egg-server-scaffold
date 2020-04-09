import { Controller } from 'egg';
import * as fs from 'fs';
import * as path from 'path';
import { RequestOptions2 as RequestOptions } from 'urllib';
interface IPrams {
  token: string;
  taskApi: string;
  userId: number;
}
interface IResponse {
  data: Buffer;
  res: {
    status: number;
  };
}
export default class ExportTaskController extends Controller {
  public async index() {
    const { ctx } = this;
    if (this.ctx.args && Array.isArray(this.ctx.args)) {
      const Authorization = this.ctx.args[0] as IPrams;
      const opts: RequestOptions = {
        headers: { Cookie: Authorization.token },
        contentType: 'json',
        dataType: 'json',
        timeout: 40000,
        method: 'POST',
        data: {
          size: 100000,
          current: 1,
          createrId: Authorization.userId.toString(),
        }
      };

      const result = await this.ctx.curl<IResponse>(
        Authorization.taskApi,
        opts,
      );
      const socketResult = {
        taskEntity: JSON.stringify(result.data),
        status: result.res.status,
      };
      await this.ctx.socket.emit('message', socketResult);
    }
  }
}
