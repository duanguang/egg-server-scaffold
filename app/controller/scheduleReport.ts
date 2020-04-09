import { Controller } from 'egg';
import CommonController from '../abstract/controller/common';
import { IScheduleModal } from '../service/scheduleReport';

/** 保存方案入参校验配置 */
const customizeParamsRule = {
  uuid: { type: 'string' },
  schemeName: { type: 'string' },
  modulesUid: { type: 'string' },
  scheme: { type: 'array' },
};

export interface IQuerySchemeParams {
  uuid: string;
}

export interface IDeleteSchemeParams {
  uuid: string;
  schemeName: string;
}

export type TTemplateCode = 'dclEntBillHeadE' | 'dclEntBillHeadI';

export interface ISetDefaultSchemeParams {
  uuid: string;
  schemeName: string;
  templateCode: TTemplateCode;
}

export interface ISaveTableSchemeParams {
  uuid: string;
  userId: string;
  scheme: object;
  modulesUid: string;
}

export default class ScheduleReportCustomController extends CommonController {
  /**
   * 保存计划单自定义方案
   */
  public async customize() {
    const { ctx } = this;
    /** 校验入参 */
    this.ctx.validate(customizeParamsRule);
    const body: IScheduleModal = ctx.request.body;
    const createResult = await this.ctx.service.scheduleReport.customizeScheduleScheme(
      body,
    );
    this.success(createResult);
  }
  /**
   * 查询计划单自定义方案
   */
  public async query() {
    this.ctx.validate({ uuid: 'string' }, this.ctx.query);
    const query: IQuerySchemeParams = this.ctx.query;
    const queryResult = await this.ctx.service.scheduleReport.queryScheduleScheme(
      query,
    );
    this.success(queryResult);
  }
  /**
   * 删除计划单自定义方案
   */
  public async delete() {
    this.ctx.validate({ uuid: 'string', schemeName: 'string' });
    const body: IDeleteSchemeParams = this.ctx.request.body;
    const deleteResult = await this.ctx.service.scheduleReport.deleteScheduleScheme(body);
    this.success(deleteResult);
  }
  /**
   * 设置默认方案
   */
  public async setDefault() {
    this.ctx.validate({ uuid: 'string', schemeName: 'string', templateCode: 'string' });
    const body: ISetDefaultSchemeParams = this.ctx.request.body;
    const updateResult = await this.ctx.service.scheduleReport.setDefault(body);
    this.success(updateResult);
  }

  /**
   * 表格条件保存通用
   */
  public async saveTableScheme() {
    this.ctx.validate({ uuid: 'string', userId: 'string', scheme: 'object' });
    const body: ISaveTableSchemeParams = this.ctx.request.body;
    const updateResult = await this.ctx.service.scheduleReport.saveTableSchemeService(body);
    this.success(updateResult);
  }

  /**
   * 表格条件保存通用
   */
  public async queryTableScheme() {
    const query: { uuid: string } = this.ctx.query;
    this.ctx.validate({ uuid: 'string' }, query);
    const queryResult = await this.ctx.service.scheduleReport.queryTableSchemeService(query);
    this.success(queryResult);
  }
}
