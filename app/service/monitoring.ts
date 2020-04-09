import { Service } from 'egg';
import { formatDate } from '../utils/format-date';
import tableListCustom, { ITableListCustom } from '../model/tableListCustom';
import ResponseModel from '../model/responseModel';
import { ICustomTableItem } from '../../typings/custom/tableCustom.d';
import { IMonitoringReport } from '../model/monitoringReport';
import * as uuid from 'uuid';
export default class MonitoringService extends Service {
  public async report(entity: IMonitoringReport) {
    try {
        const responseModel = new ResponseModel<string>();
        const newModel: IMonitoringReport = {
            ...entity,
          hash: uuid(),
          time: formatDate() as string,
        };
        const result = await this.ctx.model.MonitoringReport.create(newModel);
        if (result) {
            responseModel.code = '200';
            responseModel.message = '异常日志写入成功';
            responseModel.success = true;
            responseModel.data = '写入成功';
        }
        return responseModel;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
