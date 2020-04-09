import { Model, Document, Schema } from '.';
import { Application } from 'egg';
import { IGeneralDataSave } from '../../typings/custom/generadatasave';

export interface IGeneralDataSaveModel extends Document, IGeneralDataSave {}

export default function GeneraDataSaveModel(
    app: Application,
): Model<IGeneralDataSaveModel> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const generalDataSaveSchema: Schema = new Schema({
        modulesUid: { type: String, unique: true },
        modulesType: { type: String },
        jsonData: { type: String },
        userUid: { type: String },
        userName: { type: String },
        systemUid: { type: String },
        description: { type: String },
        createTime: { type: Number },
        updateTime: { type: Number },
    });
    return mongoose.model<IGeneralDataSaveModel>(
        'general_data_save_table',
        generalDataSaveSchema,
    );
}
