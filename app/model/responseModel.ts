export default class ResponseModel<T> {
    message: string = '';
    success: boolean = false;
    data: T|null;
    code?: string = '';
}
