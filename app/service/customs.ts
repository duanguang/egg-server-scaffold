import { Controller } from 'egg';
import ResponseModel from '../model/responseModel';
import CommonController from '../abstract/controller/common';
import { formatDate } from '../utils/format-date';

interface ICurResponse {
  data: Buffer;
  status: number;
}

interface IBaseDataResponse {
  success: string;
  list2: string;
  pageData: string;
}

interface ICommonOpt {
  session: string;
  reqHost: string;
}

export interface IQueryBaseData {
  /** 表名 */
  tableName: string;
  /** 搜索字段 */
  param: string;
  /** 页数 */
  pageIndex: number;
  /** 页码 */
  pageSize: number;
}

export default class CustomsService extends CommonController {
  private resolveUrl(url) {
    if (!/\/$/.test(url)) {
      return url + '/';
    }
    return url;
  }
  /**
   * 查询海关基础数据接口
   */
  public async queryBaseData(params: IQueryBaseData, option: ICommonOpt) {
    const responseModel = new ResponseModel<any>();
    const requestUrl = this.resolveUrl(option.reqHost);
    // 尝试从缓存里拿值，如果有缓存值直接返回
    const localCustomsData = this.app.localCustomsData[params.tableName];
    if (localCustomsData) {
      responseModel.success = true;
      responseModel.message = '查询成功';
      responseModel.code = '200';
      responseModel.data = localCustomsData;
      return responseModel;
    }
    const curlResult = await this.ctx.curl<ICurResponse>(
      `${requestUrl}/admin/basic/findByKey.json`,
      {
        headers: {
          Cookie: `SCP_JSESSIONID=${option.session}`,
        },
        method: 'POST',
        data: {
          ...params,
          pageSize: 500,
        },
        timeout: 30000,
      },
    );

    if (curlResult.status === 200) {
      const result: IBaseDataResponse = JSON.parse(curlResult.data.toString());
      if (result.success === 'true') {
        let listData = null;
        let pageData = null;
        try {
          listData = JSON.parse(result.pageData);
        } catch (error) {
          this.ctx.logger.error(error);
          listData = null;
        }
        try {
          pageData = JSON.parse(result.pageData);
        } catch (error) {
          this.ctx.logger.error(error);
          pageData = null;
        }
        responseModel.success = true;
        responseModel.message = '查询成功';
        responseModel.code = curlResult.status.toString();
        responseModel.data = {
          listData,
          pageData,
        };
        this.app.setLocalCustomsData({
          tableName: params.tableName,
          customsData: {
            pageData,
          },
        });
      } else {
        responseModel.success = false;
        responseModel.message = '查询失败';
        responseModel.code = '99';
        responseModel.data = null;
      }
    } else {
      responseModel.code = curlResult.status.toString();
      responseModel.message = '查询失败';
      responseModel.success = false;
      responseModel.data = null;
    }
    const endTimeStamp = new Date();
    return responseModel;
  }
}
