import { Controller } from 'egg';
import CommonController from '../abstract/controller/common';
import ResponseModel from '../model/responseModel';
import { EPROTONOSUPPORT } from 'constants';
import ResponsePageModel from '../model/responsePageModel';

interface ICommonOpt {
  session: string;
  reqHost: string;
}

export interface IAddAddress {
  orderType: number;
  type: number;
  shortAddress: string;
  address: string;
  contactPhone: string;
  contact: string;
}

interface IAddAddressRes {
  message: string;
  status: boolean;
}

export interface IEditAddress extends IAddAddress {
  id: number;
}

export interface IQueryAddress {
  url: string;
  page: string;
  pageSize: string;
  shortAddress: string;
  session: string;
}

interface IQueryAddressRes {
  total: number;
  rows: [];
  num: number;
}

export interface IDeleteAddress {
  ids: number;
}

interface ICurResponse {
  data: Buffer;
  status: number;
}

export default class LogisticsCollaborationService extends CommonController {
  private resolveUrl(url) {
    if (!/\/$/.test(url)) {
      return url + '/';
    }
    return url;
  }

  /**
   * 添加地址
   */
  public async addAddress(params: IAddAddress, option: ICommonOpt) {
    const responseModel = new ResponseModel<any>();
    const requestUrl = this.resolveUrl(option.reqHost);
    const curlResult = await this.ctx.curl<ICurResponse>(
      `${requestUrl}/address/add.do`,
      {
        headers: {
          Cookie: `SESSION=${option.session}`,
        },
        method: 'POST',
        data: params,
      },
    );

    if (curlResult.status === 200) {
      const result: IAddAddressRes = JSON.parse(curlResult.data.toString());
      responseModel.message = result.message;
      responseModel.success = result.status;
      if (result.status) {
        responseModel.code = curlResult.status.toString();
        responseModel.data = params;
      } else {
        responseModel.code = '99';
        responseModel.data = null;
      }
    } else {
      responseModel.code = curlResult.status.toString();
      responseModel.message = '添加失败';
      responseModel.success = false;
      responseModel.data = null;
    }
    return responseModel;
  }
  /**
   * 编辑地址
   */
  public async editAddress(params: IEditAddress, option: ICommonOpt) {
    const responseModel = new ResponseModel<any>();
    const requestUrl = this.resolveUrl(option.reqHost);
    const curlResult = await this.ctx.curl<ICurResponse>(
      `${requestUrl}/address/modify.do`,
      {
        headers: {
          Cookie: `SESSION=${option.session}`,
        },
        method: 'POST',
        data: params,
      },
    );
    if (curlResult.status === 200) {
      const result: IAddAddressRes = JSON.parse(curlResult.data.toString());
      responseModel.success = result.status;
      responseModel.message = result.message;
      if (result.status) {
        responseModel.code = curlResult.status.toString();
        responseModel.data = params;
      } else {
        responseModel.code = '99';
      }
    } else {
      responseModel.code = '99';
      responseModel.message = '修改失败';
      responseModel.success = false;
    }
    return responseModel;
  }
  /**
   * 查询地址
   */
  public async queryAddress(params: IQueryAddress, option: ICommonOpt) {
    const responseModel = new ResponseModel<any>();
    const requestUrl = this.resolveUrl(option.reqHost);
    const curlResult = await this.ctx.curl<ICurResponse>(
      `${requestUrl}/address/loadDataList.do`,
      {
        headers: {
          Cookie: `SESSION=${option.session}`,
        },
        data: {
          pageNumber: params.page,
          pageSize: params.pageSize,
          shortAddress: params.shortAddress,
        },
      },
    );
    if (curlResult.status === 200) {
      const result: IQueryAddressRes = JSON.parse(curlResult.data.toString());
      responseModel.code = curlResult.status.toString();
      responseModel.message = '获取成功';
      responseModel.success = true;
      responseModel.data = new ResponsePageModel({
        page: Number(params.page) || 1,
        pageSize: result.num || 10,
        total: result.total || 0,
        list: result.rows || [],
      });
    } else {
      responseModel.code = curlResult.status.toString();
      responseModel.message = '获取失败';
      responseModel.success = false;
      responseModel.data = null;
    }
    return responseModel;
  }
  /**
   * 删除地址
   */
  public async deleteAddress(params: IDeleteAddress, option: ICommonOpt) {
    const responseModel = new ResponseModel<any>();
    const requestUrl = this.resolveUrl(option.reqHost);
    const curlResult = await this.ctx.curl<ICurResponse>(
      `${requestUrl}/address/delete.do`,
      {
        headers: {
          Cookie: `SESSION=${option.session}`,
        },
        method: 'POST',
        data: params,
      },
    );
    if (curlResult.status === 200) {
      const result: IAddAddressRes = JSON.parse(curlResult.data.toString());
      responseModel.message = result.message;
      responseModel.success = result.status;
      if (result.status) {
        responseModel.code = curlResult.status.toString();
      } else {
        responseModel.code = '99';
      }
    } else {
      responseModel.code = curlResult.status.toString();
      responseModel.message = '删除失败';
      responseModel.success = false;
    }
    return responseModel;
  }
}
