import { Mongoose, DocumentQuery, Document, Schema, Model, model } from 'mongoose';
import tableListCustom, {
    ITableListCustom,
    IApplicationTableListCustomModel,
} from './tableListCustom';
import { IAppScheduleReportModel } from './scheduleReport';
import { IApplicationMonitoringReportModel } from './monitoringReport';
import { IAppTableSchemeModel } from './tableScheme';
import { IGeneraDataSaveModel } from './generaDatasave';
export { Model, Document, Schema };
declare module 'egg' {
  interface Application {
    mongoose: Mongoose;
  }

  interface Context {
    model: {
      TableListCustom: Model<IApplicationTableListCustomModel>;
      ScheduleReport: Model<IAppScheduleReportModel>;
      MonitoringReport: Model<IApplicationMonitoringReportModel>;
      TableScheme: Model<IAppTableSchemeModel>
      /** 沙箱调度集合 */
      SandboxDispatchReport: Model<ISandboxDispatchReportModel>,
      GeneraDatasave: Model<IGeneraDataSaveModel>;
    };
  }
}
