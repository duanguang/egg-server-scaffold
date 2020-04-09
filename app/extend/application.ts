import { Application } from 'egg';
const LOCALCUSTOMSDATA = Symbol('Application#localCustomsData');

export default {
  get localCustomsData(this: Application) {
    if (!this[LOCALCUSTOMSDATA]) {
      this[LOCALCUSTOMSDATA] = {};
    }
    return this[LOCALCUSTOMSDATA];
  },

  /** 设置基础数据 */
  setLocalCustomsData({
    tableName,
    customsData,
  }: {
    tableName: string;
    customsData: object;
  }) {
    this[LOCALCUSTOMSDATA][tableName] = customsData;
  },
};
