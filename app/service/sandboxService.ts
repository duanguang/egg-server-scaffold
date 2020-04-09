/*
 * @Author: linzeqin
 * @Date: 2019-09-30 09:07:07
 * @description: 沙箱资源调度service
 */
import { Service } from 'egg';

export default class SandboxService extends Service {
    /**
     * 根据调度序号和环境变量获取脚本内容
     * @memberof SandboxService
     */
    public async getScript(dpNo: number, env: string) {
        try {
            return await this.ctx.model.SandboxDispatchReport.aggregate([
                {
                    $match: {
                        dispatchNo: dpNo,
                    },
                },
                {
                    $lookup: {
                        from: 'sandbox_reports',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                {
                    $unwind: {
                        path: '$product',
                    },
                },
                {
                    $unwind: {
                        path: '$product.scriptList',
                    },
                },
                {
                    $match: {
                        'product.scriptList.env': env,
                    },
                },
            ]);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
