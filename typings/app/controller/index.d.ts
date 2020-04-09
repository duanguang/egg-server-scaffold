// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustoms from '../../../app/controller/customs';
import ExportGeneradatasave from '../../../app/controller/generadatasave';
import ExportHome from '../../../app/controller/home';
import ExportLcm from '../../../app/controller/lcm';
import ExportLogisticsCollaboration from '../../../app/controller/logisticsCollaboration';
import ExportMonitoring from '../../../app/controller/monitoring';
import ExportSandbox from '../../../app/controller/sandbox';
import ExportScheduleReport from '../../../app/controller/scheduleReport';
import ExportTable from '../../../app/controller/table';

declare module 'egg' {
  interface IController {
    customs: ExportCustoms;
    generadatasave: ExportGeneradatasave;
    home: ExportHome;
    lcm: ExportLcm;
    logisticsCollaboration: ExportLogisticsCollaboration;
    monitoring: ExportMonitoring;
    sandbox: ExportSandbox;
    scheduleReport: ExportScheduleReport;
    table: ExportTable;
  }
}
