import { Service } from 'egg';
import ResponseModel from '../model/responseModel';
import { IGeneralDataSave } from '../../typings/custom/generadatasave';

export default class DataSaveService extends Service {

    public async savedata(params: IGeneralDataSave) {
        try {
            const responseModel = new ResponseModel<any>();
            responseModel.code = '200';
            responseModel.message = '添加成功!';
            responseModel.success = true;
            responseModel.data = null;
            const { modulesUid, modulesType, jsonData, userUid, userName, systemUid, description } = params;
            /* const result = await this.ctx.model.GeneraDatasave.updateOne({ modulesUid }, { modulesUid, modulesType, jsonData, userUid, userName, systemUid, description, }, { upsert: true }); */
            const result = await this.ctx.model.GeneraDatasave.findOne({ modulesUid });
            if (result) {
                // 更新数据
                await this.ctx.model.GeneraDatasave.updateOne({ modulesUid }, { modulesUid, modulesType, jsonData, userUid, userName, systemUid, description, updateTime: new Date().getTime() });
            } else {
                // 插入数据
                await this.ctx.model.GeneraDatasave.create({ modulesUid, modulesType, jsonData, userUid, userName, systemUid, description, createTime: new Date().getTime() });
            }
            return responseModel;
        } catch (err) {
            this.logger.error(err);
        }
    }

    public async searchdata(params: IGeneralDataSave) {
        try {
            const responseModel = new ResponseModel<any>();
            responseModel.code = '200';
            responseModel.message = '查询成功!';
            responseModel.success = true;
            responseModel.data = null;
            const { modulesUid } = params;
            const result = await this.ctx.model.GeneraDatasave.findOne({ modulesUid });
            if (result) {
                responseModel.data = result;
            }
            return responseModel;
        } catch (err) {
            this.logger.error(err);
        }
    }

    public async collection(params: IGeneralDataSave) {
        try {
            const responseModel = new ResponseModel<any>();
            responseModel.code = '200';
            responseModel.message = '查询成功!';
            responseModel.success = true;
            responseModel.data = null;
            const { modulesType, userUid, userName, systemUid, description } = params;
            const result = await this.ctx.model.GeneraDatasave.find({
                ...modulesType && { modulesType },
                ...userUid && { userUid },
                ...userName && { userName },
                ...systemUid && { systemUid },
                ...description && { description },
            });
            if (result) {
                responseModel.data = result;
            }
            return responseModel;
        } catch (err) {
            this.logger.error(err);
        }
    }
}
