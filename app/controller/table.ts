import { Controller } from 'egg';
import CommonController from '../abstract/controller/common';
import ResponseModel from '../model/responseModel';
import { ICustomTableItem } from '../../typings/custom/tableCustom.d';
export default class TableListCustomController extends CommonController {
  /** 提供lcm资源 */
  public async edit() {
    // console.log(this.ctx.request.body);
    const body: {
      modulesUid: string;
      customColumns: ICustomTableItem[];
    } = this.ctx.request.body;
    const createResult = await this.ctx.service.tableListCustom.edit(body);
    this.success(createResult);
  }
  public async query() {
    const { ctx } = this;
    const query: { modulesUid: string } = ctx.query;
    const createResult = await this.ctx.service.tableListCustom.getQueryTableCustomItem(query.modulesUid);
    this.success(createResult);
  }
}
