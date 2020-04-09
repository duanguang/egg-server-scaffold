// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportCustoms from '../../../app/service/customs';
import ExportGeneradatasave from '../../../app/service/generadatasave';
import ExportLcm from '../../../app/service/lcm';
import ExportLogisticsCollaboration from '../../../app/service/logisticsCollaboration';
import ExportMonitoring from '../../../app/service/monitoring';
import ExportSandboxService from '../../../app/service/sandboxService';
import ExportScheduleReport from '../../../app/service/scheduleReport';
import ExportTableListCustom from '../../../app/service/tableListCustom';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    customs: ExportCustoms;
    generadatasave: ExportGeneradatasave;
    lcm: ExportLcm;
    logisticsCollaboration: ExportLogisticsCollaboration;
    monitoring: ExportMonitoring;
    sandboxService: ExportSandboxService;
    scheduleReport: ExportScheduleReport;
    tableListCustom: ExportTableListCustom;
  }
}
