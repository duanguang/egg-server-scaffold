/*
 * @Author: linzeqin
 * @Date: 2019-09-30 09:24:09
 * @description: 沙箱资源调度cnotroller
 */
import CommonController from '../abstract/controller/common';

export default class SandboxController extends CommonController {
    /**
     * 根据调度序号和环境变量获取脚本内容
     * @memberof SandboxController
     */
    public async getScript() {
        const { ctx } = this;
        const { query } = ctx.request;
        const { dpNo, env } = query;
        this.ctx.set('Content-Type', 'text/javascript;charset=UTF-8');
        try {
            const res = await this.ctx.service.sandboxService.getScript(Number(dpNo), env);
            if (res && res.length > 0) {
                this.ctx.body = res[0].product.scriptList.script;
            } else {
                this.ctx.body = '';
            }
        } catch (error) {
            this.ctx.body = '';
        }
    }
}
