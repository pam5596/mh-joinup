import AbsError from "./abstruct";

export default class ServiceError<DataType> extends AbsError<DataType> {
    constructor(
        message: string,
        data: DataType | null = null,
        code: number = 500
    ) {
        super(message, data, 'service', code);
    }
}