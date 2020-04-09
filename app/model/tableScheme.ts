import { Application } from 'egg';
import { ICustomSchedule } from '../../typings/custom/scheduleCustomization';
import { Model, Document, Schema } from '.';

export interface ITableScheme {
  uuid?: string;
  modulesUid: string;
  schemeName: string;
  scheme: string;
  createDate?: string;
  updateDate?: string;
}

export interface IAppTableSchemeModel extends Document, ITableScheme {}

export default function tableSchemeModel(
  app: Application,
): Model<IAppTableSchemeModel> {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TableSchemeSchema: Schema = new Schema(
    {
      /** 唯一键 */
      uuid: { type: String },
      /**  模块唯一uid */
      modulesUid: { type: String },
      /** 用户id */
      userId: { type: String },
      /** 方案信息 */
      scheme: { type: String },
      createTime: { type: Number },
      updateTime: { type: Number },
    },
    {
      timestamps: { updatedAt: 'updateTime', createdAt: 'createTime' },
    },
  );
  return mongoose.model<IAppTableSchemeModel>(
    'TableScheme',
    TableSchemeSchema,
  );
}
