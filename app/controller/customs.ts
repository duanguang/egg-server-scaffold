import CommonController from '../abstract/controller/common';
import { IQueryBaseData } from '../service/customs';

const commonRules = {
  reqHost: 'string',
  session: 'string',
};

/** 查询校验配置 */
const VQueryAddressRules = {
  pageIndex: 'string',
  pageSize: 'string',
  ...commonRules,
};

export default class CustomsController extends CommonController {
  private getOptions(ctx) {
    const session = ctx.get('session');
    const reqHost = ctx.get('requestHost');
    const option = {
      session,
      reqHost,
    };
    return option;
  }
  /**
   * 查询海关基础数据
   */
  public async queryBaseData() {
    const option = this.getOptions(this.ctx);
    this.ctx.validate(VQueryAddressRules, {
      ...this.ctx.query,
      ...option,
    });
    const query: IQueryBaseData = this.ctx.query;
    const result = await this.ctx.service.customs.queryBaseData(
      query,
      option,
    );
    this.success(result);
  }
}
