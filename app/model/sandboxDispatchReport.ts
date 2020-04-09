/*
 * @Author: linzeqin
 * @Date: 2019-09-29 14:33:19
 * @description: 沙箱资源调度模块表结构
 */
import { Model, Document, Schema } from '.';
import { Application } from 'egg';

/** 调度实体 */
export class SandboxDispatchReport {
    /** 调度序号 */
    dispatchNo: number = 0;

    /** 描述 */
    description: string = '';

    /** 关联项目id */
    productId: string = '';

    /** 创建时间 */
    createTime: number = new Date().getTime();

    /** 修改时间 */
    updateTime: number = new Date().getTime();
}

export interface ISandboxDispatchReportModel extends Document, SandboxDispatchReport {}

export default function SandboxDispatchReportModel(
    app: Application,
): Model<ISandboxDispatchReportModel> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const sandboxReportSchema: Schema = new Schema<SandboxDispatchReport>({
        dispatchNo: { type: Number, unique: true },
        description: { type: String },
        productId: { type: mongoose.Types.ObjectId },
        createTime: { type: Number },
        updateTime: { type: Number },
    }, {
        timestamps: { updatedAt: 'updateTime', createdAt: 'createTime' },
    });
    return mongoose.model<ISandboxDispatchReportModel>(
        'Sandbox_Dispatch_Report',
        sandboxReportSchema,
    );
}
