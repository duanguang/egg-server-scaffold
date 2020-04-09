import { Controller } from 'egg';
import CommonController from '../abstract/controller/common';
import {
  IQueryAddress,
  IAddAddress,
  IDeleteAddress,
  IEditAddress,
} from '../service/logisticsCollaboration';

const commonRules = {
  reqHost: 'string',
  session: 'string',
};

/** 查询地址参数校验配置 */
const VQueryAddressRules = {
  page: 'string',
  pageSize: 'string',
  ...commonRules,
};

/** 添加地址参数校验配置 */
const VAddAddressRules = {
  orderType: 'number',
  type: 'number',
  shortAddress: 'string',
  address: 'string',
  contactPhone: 'string',
  contact: 'string',
  ...commonRules,
};

const VEditAddressRules = {
  ...VAddAddressRules,
  id: 'number',
};

/** 删除地址参数校验配置 */
const VDeleteAddressRules = {
  ids: 'string',
  ...commonRules,
};

/** 物流协同——地址库 */
export default class LogisticsCollaborationController extends CommonController {
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
   * 添加地址
   */
  public async addAddress() {
    const option = this.getOptions(this.ctx);
    const body: IAddAddress = this.ctx.request.body;
    this.ctx.validate(VAddAddressRules, { ...option, ...body });
    const result = await this.ctx.service.logisticsCollaboration.addAddress(
      body,
      option,
    );
    this.success(result);
  }

  /**
   * 编辑地址
   */
  public async editAddress() {
    const option = this.getOptions(this.ctx);
    const body: IEditAddress = this.ctx.request.body;
    this.ctx.validate(VEditAddressRules, { ...option, ...body });
    const result = await this.ctx.service.logisticsCollaboration.editAddress(body, option);
    this.success(result);
  }

  /**
   * 删除地址
   */
  public async deleteAddress() {
    const option = this.getOptions(this.ctx);
    const body: IDeleteAddress = this.ctx.request.body;
    this.ctx.validate(VDeleteAddressRules, {
      ...option,
      ...body,
    });
    const result = await this.ctx.service.logisticsCollaboration.deleteAddress(
      body,
      option,
    );
    this.success(result);
  }

  /**
   * 查询地址
   */
  public async queryAddress() {
    const option = this.getOptions(this.ctx);
    this.ctx.validate(VQueryAddressRules, {
      ...this.ctx.query,
      ...option,
    });
    const query: IQueryAddress = this.ctx.query;
    const result = await this.ctx.service.logisticsCollaboration.queryAddress(
      query,
      option,
    );
    this.success(result);
  }
}
