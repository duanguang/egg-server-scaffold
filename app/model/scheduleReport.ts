import { Application } from 'egg';
import { ICustomSchedule } from '../../typings/custom/scheduleCustomization';
import { Model, Document, Schema } from '.';
import { TTemplateCode } from '../controller/scheduleReport';

export interface IScheduleReport {
  uuid?: string;
  modulesUid: string;
  schemeName: string;
  scheme: ICustomSchedule[];
  isDefault?: boolean;
  createDate?: string;
  updateDate?: string;
  templateCode: TTemplateCode;
}

export interface IAppScheduleReportModel extends Document, IScheduleReport {}

export default function scheduleReportModel(
  app: Application,
): Model<IAppScheduleReportModel> {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ScheduleReportSchema: Schema = new Schema({
    /** 唯一键 */
    uuid: { type: String },
    /**  模块唯一uid */
    modulesUid: { type: String },
    /** 用户id */
    userId: { type: String },
    /** 保存方案的名称 */
    schemeName: { type: String },
    /** 方案信息 */
    scheme: { type: Array },
    /** 是否是默认方案标识 */
    isDefault: { type: Boolean, default: false },
    templateCode: { type: String },
    createDate: { type: String },
    updateDate: { type: String },
  });
  return mongoose.model<IAppScheduleReportModel>(
    'ScheduleReport',
    ScheduleReportSchema,
  );
}
