import { Service } from 'egg';
import { HttpClientResponse } from 'urllib';

/**
 * Lcm Service
 */
export default class Lcm extends Service {
  /**
   * 加载lcm入口文件
   * @param {string} host
   * @param {string} path
   * @memberof Lcm
   */
  public async loadEntryFile(host: string, path: string) {
    const result = await this.ctx.curl<HttpClientResponse<string>>(host + path, {
      dataType: 'text',
    });
    let styleList: string[] = [];
    let scriptList: string[] = [];
    if (result.data && result.status === 200) {
      /** 截取并拼接css文件地址  */
      styleList = Array.from(result.data.match(/<link.*?href=\"(.+?)\"/ig) || []).map(item => {
        const res = item.split('href=\"')[1];
        return res.substr(0, res.length - 1).replace('..', host);
      });
      /** 截取并拼接js文件地址 */
      scriptList = Array.from(result.data.match(/<script.*?src=\"(.+?)\"/ig) || []).map(item => {
        const res = item.split('src=\"')[1];
        return res.substr(0, res.length - 1).replace('..', host);
      });
    }
    return {
      data: {
        styleList,
        scriptList,
      },
      code: result.status,
      success: !!result.data,
    };
  }
}
