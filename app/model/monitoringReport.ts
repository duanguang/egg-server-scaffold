import { Application } from 'egg';
import { Model, Document, Schema } from './index.d';
export interface IMonitoringReport {
  /** 一个界面产生一个requestId */

  requestId: string;
  /**  一个阶段产生一个traceId，用于追踪和一个异常相关的所有日志记录 */
  traceId: string;
  /**  这条log的唯一标识码，相当于logId，但它是根据当前日志记录的具体内容而生成的 */
  hash?: string;
  /**  日志产生时间 */
  time?: string;

  userId: number;
  userName: string;
  companyName: string;
  /**  所在路径url */
  path: string;
  /**  进行了什么操作 */
  action: string;
  /**  当前界面state store数据 */
  data?: string;
  /**  提交数据 */
  dataSend?: string;
  /**  用户操作dom元素 */
  targetElement?: string;
  /**  错误类型 */
  errorType: string;
  /**  错误级别 */
  errorLevel: string;
  /**  错误stack */
  errorStack: string;
  /**  出错文件 */
  errorFilename: string;
  /**  出错行位置 */
  errorLineNo: number;
  /**  出错列位置 */
  errorColNo: number;
  /**  错误描述 */
  errorMessage: string;
  /**  时间戳 */
  errorTimeStamp: number;
  /**  事件类型 */
  eventType: string;
  /**  网络环境描述 */
  network: string;
  /**  客户端描述 */
  userAgent: string;
  /**  设备描述 */
  device: string;
  /**  操作系统描述 */
  system: string;
  /**  应用版本 */
  appVersion: string;
  /**  接口版本 */
  apiVersion: string;
  /**  应用环境 qa, uat prod */
  environment: string;
  /**  应用系统 */
  appSystem: string;
}
export interface IApplicationMonitoringReportModel
  extends Document,
  IMonitoringReport {}
export default function monitoringReport(
  app: Application,
): Model<IApplicationMonitoringReportModel> {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MonitoringReportSchema: Schema = new Schema({
    /** 一个界面产生一个requestId */

    requestId: { type: String },
    /**  一个阶段产生一个traceId，用于追踪和一个异常相关的所有日志记录 */
    traceId: { type: String },
    /**  这条log的唯一标识码，相当于logId，但它是根据当前日志记录的具体内容而生成的 */
    hash: { type: String },
    /**  日志产生时间 */
    time: { type: String },

    userId: { type: Number },
    userName: { type: String },
    companyName: { type: String },
    /**  所在路径url */
    path: { type: String },
    /**  进行了什么操作 */
    action: { type: String },
    /**  当前界面state store数据 */
    data: { type: String },
    /**  提交数据 */
    dataSend: { type: String },
    /**  用户操作dom元素 */
    targetElement: { type: String },
    /**  错误类型 */
    errorType: { type: String },
    /**  错误级别 */
    errorLevel: { type: String },
    /**  错误stack */
    errorStack: { type: String },
    /**  出错文件 */
    errorFilename: { type: String },
    /**  出错行位置 */
    errorLineNo: { type: Number },
    /**  出错列位置 */
    errorColNo: { type: Number },
    /**  错误描述 */
    errorMessage: { type: String },
    /**  时间戳 */
    errorTimeStamp: { type: Number },
    /**  事件类型 */
    eventType: { type: String },
    /**  网络环境描述 */
    network: { type: String },
    /**  客户端描述 */
    userAgent: { type: String },
    /**  设备描述 */
    device: { type: String },
    /**  操作系统描述 */
    system: { type: String },
    /**  应用版本 */
    appVersion: { type: String },
    /**  接口版本 */
    apiVersion: { type: String },
    /**  应用环境 qa, uat prod */
    environment: { type: String },
    /**  应用系统 */
    appSystem: { type: String },
  });
  return mongoose.model<IApplicationMonitoringReportModel>(
    'MonitoringReport',
    MonitoringReportSchema,
  );
}
