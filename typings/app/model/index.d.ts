// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGeneraDatasave from '../../../app/model/generaDatasave';
import ExportMonitoringReport from '../../../app/model/monitoringReport';
import ExportResponseModel from '../../../app/model/responseModel';
import ExportResponsePageModel from '../../../app/model/responsePageModel';
import ExportSandboxDispatchReport from '../../../app/model/sandboxDispatchReport';
import ExportScheduleReport from '../../../app/model/scheduleReport';
import ExportTableListCustom from '../../../app/model/tableListCustom';
import ExportTableScheme from '../../../app/model/tableScheme';

declare module 'egg' {
  interface IModel {
    GeneraDatasave: ReturnType<typeof ExportGeneraDatasave>;
    MonitoringReport: ReturnType<typeof ExportMonitoringReport>;
    ResponseModel: ReturnType<typeof ExportResponseModel>;
    ResponsePageModel: ReturnType<typeof ExportResponsePageModel>;
    SandboxDispatchReport: ReturnType<typeof ExportSandboxDispatchReport>;
    ScheduleReport: ReturnType<typeof ExportScheduleReport>;
    TableListCustom: ReturnType<typeof ExportTableListCustom>;
    TableScheme: ReturnType<typeof ExportTableScheme>;
  }
}
