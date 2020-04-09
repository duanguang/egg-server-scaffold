import CommonController from '../abstract/controller/common';
import ResponseModel from '../model/responseModel';
import { IGeneralDataSave } from '../../typings/custom/generadatasave';

export default class DataSaveController extends CommonController {

    public async save() {
        const query: IGeneralDataSave = this.ctx.request.body;
        /** 返回值 */
        const responseModel = new ResponseModel();
        /** 参数校验 */
        const error = this.app.validator.validate({
            modulesUid: { type: 'string', required: true },
            modulesType: { type: 'string', required: true },
            jsonData: { type: 'string', required: true },
            userUid: { type: 'string', required: false },
            userName: { type: 'string', required: false },
            systemUid: { type: 'string', required: false },
            description: { type: 'string', required: false },
        }, query);
        if (error) {
            responseModel.code = '200';
            responseModel.message = '参数错误';
            responseModel.success = false;
            responseModel.data = error;
            this.ctx.body = responseModel;
            return;
        }
        const createResult = await this.ctx.service.generadatasave.savedata(query);
        this.success(createResult);
    }

    public async search() {
        const query: IGeneralDataSave = this.ctx.request.body;
        /** 返回值 */
        const responseModel = new ResponseModel();
        /** 参数校验 */
        const error = this.app.validator.validate({
            modulesUid: { type: 'string', required: true },
        }, query);
        if (error) {
            responseModel.code = '200';
            responseModel.message = '参数错误';
            responseModel.success = false;
            responseModel.data = error;
            this.ctx.body = responseModel;
            return;
        }
        const createResult = await this.ctx.service.generadatasave.searchdata(query);
        this.success(createResult);
    }

    public async collection() {
        const query: IGeneralDataSave = this.ctx.request.body;
        /** 返回值 */
        const responseModel = new ResponseModel();
        /** 参数校验 */
        const error = this.app.validator.validate({
            modulesType: { type: 'string', required: false },
            userUid: { type: 'string', required: false },
            userName: { type: 'string', required: false },
            systemUid: { type: 'string', required: false },
            description: { type: 'string', required: false },
        }, query);
        if (error) {
            responseModel.code = '200';
            responseModel.message = '参数错误';
            responseModel.success = false;
            responseModel.data = error;
            this.ctx.body = responseModel;
            return;
        }
        const createResult = await this.ctx.service.generadatasave.collection(query);
        this.success(createResult);
    }
}
