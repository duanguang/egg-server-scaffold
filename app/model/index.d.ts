import {
  Mongoose,
  DocumentQuery,
  Document,
  Schema,
  Model,
  model,
} from 'mongoose';
import tableListCustom, {
  ITableListCustom,
  IApplicationTableListCustomModel,
} from './tableListCustom';
export { Model, Document, Schema };
declare module 'egg' {
  interface Application {
    mongoose: Mongoose;
  }

  interface Context {
    model: {
      TableListCustom: Model<IApplicationTableListCustomModel>;
    };
  }
}
