import { Controller } from 'egg';
import CommonController from '../abstract/controller/common';
import ResponseModel from '../model/responseModel';
import { ICustomTableItem } from '../../typings/custom/tableCustom.d';
import { IMonitoringReport } from '../model/monitoringReport';
const createRule = {
  errorType: { type: 'string', required: true },
  errorLevel: { type: 'string', required: true },
  errorStack: { type: 'string', required: true },
  errorFilename: { type: 'string', required: true },
  errorLineNo: { type: 'number', required: true },
  errorColNo: { type: 'number', required: true },
  errorMessage: { type: 'string', required: true },
  errorTimeStamp: { type: 'number', required: true },
  network: { type: 'string', required: true },
  userAgent: { type: 'string', required: true },
  device: { type: 'string', required: true },
  system: { type: 'string', required: true },
  environment: { type: 'string', required: true },
  appSystem: { type: 'string', required: true },
};
export default class MonitoringController extends CommonController {
  /**
   * 上报异常错误
   *
   * @memberof MonitoringController
   */
  public async report() {
    try {
      this.ctx.validate(createRule, this.ctx.request.body);
      const body: IMonitoringReport = this.ctx.request.body;
      const createResult = await this.ctx.service.monitoring.report(body);
      this.success(createResult);
    } catch (error) {
      const responseModel = new ResponseModel<string>();
      responseModel.code = '99';
      responseModel.data = error;
      responseModel.message = '参数验证异常';
      responseModel.success = false;
      this.success(responseModel);
      this.logger.error(error);
    }
  }
}
