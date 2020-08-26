// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTableListCustom from '../../../app/service/tableListCustom';

declare module 'egg' {
  interface IService {
    tableListCustom: ExportTableListCustom;
  }
}
