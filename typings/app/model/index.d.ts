// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportResponseModel from '../../../app/model/responseModel';
import ExportTableListCustom from '../../../app/model/tableListCustom';

declare module 'egg' {
  interface IModel {
    ResponseModel: ReturnType<typeof ExportResponseModel>;
    TableListCustom: ReturnType<typeof ExportTableListCustom>;
  }
}
