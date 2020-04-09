import { Application } from 'egg';
// module.exports = app => {
//   const mongoose = app.mongoose;
//   const Schema = mongoose.Schema;
//   const TableListCustomSchema = new Schema({
//     /** 唯一键 */
import { Model, Document, Schema } from './index.d';
import { ICustomTableItem } from '../../typings/custom/tableCustom.d';

//     uuid: { type: String },
//     /**  模块唯一uid */
//     modulesUid: { type: String },
//     /** 自定义列信息 json 字符串 [{dataIndex:'',title:''}] */
//     customColumns: { type: String },
//     createDate: { type: String },
//     updateDate: { type: String },
//   });
//   return mongoose.model('tableListCustom', TableListCustomSchema);
// };
export interface ITableListCustom {
  uuid?: string;
  modulesUid: string;
  customColumns: ICustomTableItem[];
  createDate?: string;
  updateDate?: string;
}
export interface IApplicationTableListCustomModel
  extends Document,
    ITableListCustom {}
export default function tableListCustom(
  app: Application,
): Model<IApplicationTableListCustomModel> {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TableListCustomSchema: Schema = new Schema({
    /** 唯一键 */

    uuid: { type: String },
    /**  模块唯一uid */
    modulesUid: { type: String },
    /** 自定义列信息 json 字符串 [{dataIndex:'',title:''}] */
    customColumns: { type: Array },
    createDate: { type: String },
    updateDate: { type: String },
  });
  return mongoose.model<IApplicationTableListCustomModel>(
    'TableListCustom',
    TableListCustomSchema,
  );
}
