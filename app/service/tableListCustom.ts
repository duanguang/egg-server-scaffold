import { Service } from 'egg';
import { formatDate } from '../utils/format-date';
import tableListCustom, { ITableListCustom } from '../model/tableListCustom';
import ResponseModel from '../model/responseModel';
import { ICustomTableItem } from '../../typings/custom/tableCustom.d';
interface ICustomModel {
  modulesUid: string;
  customColumns: ICustomTableItem[];
}
export default class TableListCustomService extends Service {
  public async edit(entity: ICustomModel | ICustomModel[]) {
    try {
      const responseModel = new ResponseModel<ICustomModel>();
      if (!Array.isArray(entity)) {
        const model = await this.ctx.model.TableListCustom.findOne({
          modulesUid: entity.modulesUid,
        });
        if (model) {
          const newModel: ITableListCustom = {
            /* ...model, */
            customColumns: entity.customColumns,
            updateDate: formatDate() as string,
            modulesUid: model.modulesUid,
          };
          const result: {
            ok: number;
          } = await this.ctx.model.TableListCustom.update(
            { modulesUid: newModel.modulesUid },
            newModel,
          );
          if (result.ok === 1) {
            responseModel.code = '200';
            responseModel.message = '列信息数据更新成功!';
            responseModel.success = true;
            responseModel.data = {
              customColumns: newModel.customColumns,
              modulesUid: model.modulesUid,
            };
          }
        } else {
          const newModel: ITableListCustom = {
            ...entity,
            createDate: formatDate() as string,
          };
          const result = await this.ctx.model.TableListCustom.create(newModel);
          if (result && result.modulesUid) {
            responseModel.code = '200';
            responseModel.message = '列信息数据新增成功!';
            responseModel.success = true;
            responseModel.data = {
              customColumns: result.customColumns,
              modulesUid: result.modulesUid,
            };
          }
        }
      }
      return responseModel;
    } catch (err) {
      this.logger.error(err);
    }
  }
  public async getQueryTableCustomItem(modulesUid: string) {
    try {
      const model = await this.ctx.model.TableListCustom.findOne({
        modulesUid,
      });
      const responseModel = new ResponseModel<ICustomModel>();
      responseModel.code = '200';
      responseModel.message = '列信息数据查询成功!';
      responseModel.success = true;
      responseModel.data = null;
      if (model) {
        responseModel.data = {
          customColumns: model.customColumns,
          modulesUid: model.modulesUid,
        };
      }
      return responseModel;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
