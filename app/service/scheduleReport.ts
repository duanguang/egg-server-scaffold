import { Service } from 'egg';
import ResponseModel from '../model/responseModel';
import { IScheduleReport } from '../model/scheduleReport';
import { formatDate } from '../utils/format-date';
import { ICustomSchedule } from '../../typings/custom/scheduleCustomization';
import {
  IQuerySchemeParams,
  IDeleteSchemeParams,
  ISetDefaultSchemeParams,
  TTemplateCode,
  ISaveTableSchemeParams,
} from '../controller/scheduleReport';
import { IAppTableSchemeModel } from '../model/tableScheme';

export interface IScheduleModal {
  /** 用户id */
  uuid?: string;
  /** 模块id */
  modulesUid: string;
  /** 方案名称 */
  schemeName: string;
  /** 方案内容 */
  scheme: ICustomSchedule[];
  templateCode: TTemplateCode;
}

export default class ScheduleReportCustomService extends Service {
  /**
   * 保存计划单自定义方案
   */
  public async customizeScheduleScheme(entity: IScheduleModal) {
    const responseModel = new ResponseModel<IScheduleModal>();
    try {
      const model = await this.ctx.model.ScheduleReport.findOne({
        uuid: entity.uuid,
        schemeName: entity.schemeName,
        templateCode: entity.templateCode,
      });
      /** 如果在数据库中有找到存在的modulesUid，则提示已存在 */
      if (model) {
        responseModel.code = '99';
        responseModel.message = '方案已存在';
        responseModel.success = false;
      } else {
        const newModel: IScheduleReport = {
          ...entity,
          createDate: formatDate() as string,
        };
        console.log('newModel', newModel);
        const result = await this.ctx.model.ScheduleReport.create(newModel);
        if (result && result.modulesUid) {
          responseModel.code = '200';
          responseModel.message = '添加成功';
          responseModel.success = true;
          responseModel.data = {
            scheme: result.scheme,
            modulesUid: result.modulesUid,
            schemeName: result.schemeName,
            templateCode: result.templateCode,
          };
        }
      }
      return responseModel;
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }
  /**
   * 查询计划单自定义方案
   */
  public async queryScheduleScheme(params: IQuerySchemeParams) {
    const responseModel = new ResponseModel<IScheduleModal[]>();
    try {
      const model = await this.ctx.model.ScheduleReport.find({
        uuid: params.uuid,
      }).sort({ createDate: 'desc' });
      responseModel.code = '200';
      responseModel.message = '方案查询成功!';
      responseModel.success = true;
      responseModel.data = null;
      console.log('model', model);
      responseModel.data = model;
      return responseModel;
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }
  /**
   * 删除计划单自定义方案
   */
  public async deleteScheduleScheme(params: IDeleteSchemeParams) {
    const responseModel = new ResponseModel<IScheduleModal[]>();
    try {
      const deleteResult = await this.ctx.model.ScheduleReport.deleteOne({
        uuid: params.uuid,
        schemeName: params.schemeName,
      });
      // console.log('deleteResult', deleteResult);
      if (deleteResult.ok === 1) {
        if (deleteResult.n) {
          responseModel.code = '200';
          responseModel.message = '删除成功！';
          responseModel.success = true;
        } else {
          responseModel.code = '200';
          responseModel.message = '没有找到对应的数据！';
          responseModel.success = true;
        }
      } else {
        responseModel.code = '99';
        responseModel.message = '删除失败！';
        responseModel.success = false;
      }
      return responseModel;
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }
  /**
   * 设置默认方案
   */
  public async setDefault(params: ISetDefaultSchemeParams) {
    const responseModel = new ResponseModel<IScheduleModal[]>();
    try {
      // const resetDefault = await this.ctx.model.ScheduleReport.updateMany({}, { isDefault: false });
      // 先把当前的默认方案查出来
      const queryResult = await this.ctx.model.ScheduleReport.find({
        uuid: params.uuid,
        templateCode: params.templateCode,
      });
      let filterResult = queryResult.filter(el => el.isDefault)[0];
      // 如果当前已经设置了默认方案
      if (filterResult && filterResult.schemeName === params.schemeName) {
        responseModel.code = '99';
        responseModel.message = '当前方案已经是默认方案';
        responseModel.success = false;
        return responseModel;
      }
      filterResult = queryResult.filter(
        el => el.schemeName === params.schemeName,
      )[0];
      // 如果传错方案名
      if (!filterResult) {
        responseModel.code = '99';
        responseModel.message = '找不到对应方案名';
        responseModel.success = false;
        return responseModel;
      } else {
        await this.ctx.model.ScheduleReport.updateMany(
          {
            uuid: params.uuid,
            templateCode: params.templateCode,
          },
          { isDefault: false },
        );
        // 设置新的默认方案
        const updateResult = await this.ctx.model.ScheduleReport.updateOne(
          {
            uuid: params.uuid,
            schemeName: params.schemeName,
          },
          {
            isDefault: true,
          },
        );
        if (updateResult.nModified) {
          responseModel.code = '200';
          responseModel.success = true;
          responseModel.message = '设置成功';
        } else {
          responseModel.code = '99';
          responseModel.success = false;
          responseModel.message = '设置失败';
        }
        return responseModel;
      }
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }

  /**
   * 表格条件保存通用
   */
  public async saveTableSchemeService(params: ISaveTableSchemeParams) {
    const responseModel = new ResponseModel();
    try {
      const stringifyScheme = JSON.stringify(params.scheme);
      const queryRes = await this.ctx.model.TableScheme.findOne({
        uuid: params.uuid,
      });
      let result;
      if (queryRes) {
        result = await this.ctx.model.TableScheme.updateOne({
          uuid: params.uuid,
        }, {
          ...params,
          scheme: stringifyScheme,
        });
      } else {
        result = await this.ctx.model.TableScheme.create({
          ...params,
          scheme: stringifyScheme,
        });
      }
      if (result) {
        responseModel.code = '200';
        responseModel.success = true;
        responseModel.message = '设置成功';
      } else {
        responseModel.code = '99';
        responseModel.success = false;
        responseModel.message = '设置失败';
      }
      return responseModel;
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }

  /**
   * 表格条件查询通用
   */
  public async queryTableSchemeService(params: { uuid: string }) {
    const responseModel = new ResponseModel<IAppTableSchemeModel>();
    try {
      const result = await this.ctx.model.TableScheme.findOne({
        uuid: params.uuid,
      });
      responseModel.code = '200';
      responseModel.message = '方案查询成功!';
      responseModel.success = true;
      if (result) {
        responseModel.data = {
          ...result.toObject(),
          scheme: JSON.parse(result.scheme),
        };
      } else {
        responseModel.data = null;
      }
      return responseModel;
    } catch (error) {
      this.logger.error(error);
      responseModel.code = '500';
      responseModel.message = '系统异常';
      responseModel.success = false;
      return responseModel;
    }
  }
}
