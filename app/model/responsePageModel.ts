export default class ResponsePageModel<T> {
  page: number = 1;
  pageSize: number = 10;
  list: T | [];
  total?: number = 0;

  constructor(params?: Partial<ResponsePageModel<any>>) {
    if (params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key];
      });
    }
  }
}
